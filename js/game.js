const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    backgroundColor: '#0f0f13',
    scene: { create: create, update: gameUpdate }
};

const game = new Phaser.Game(config);
window.getPhaserScene = () => game.scene.scenes[0];

function create() {
    this.states = {};
    this.graphics = this.add.graphics();
    this.selectedState = null;
    this.hoveredTargets = [];

    this.buildMap = (data) => {
        data.states.forEach(s => {
            const glow = this.add.circle(s.x, s.y, 42, s.color, 0.15);
            const c = this.add.circle(s.x, s.y, 35, s.color);
            c.setStrokeStyle(2, 0xffffff, 0.2);
            c.setInteractive(
                new Phaser.Geom.Circle(35, 35, 35),
                Phaser.Geom.Circle.Contains
            );
            const t = this.add.text(s.x, s.y, s.armyCount, {
                fontSize: '16px', fontWeight: 'bold',
                fill: '#fff', fontFamily: 'Orbitron'
            }).setOrigin(0.5);

            Object.assign(c, {
                stateId: s.id,
                armyCount: s.armyCount,
                regenRate: s.regenRate,
                textElement: t,
                owner: s.owner,
                fillColor: s.color,
                glow
            });

            c.on('pointerdown', () => {
                if (c.owner === getMyRole() && isGameStarted()) {
                    this.selectedState = c;
                    this.hoveredTargets = [];
                    c.setStrokeStyle(4, 0xffffff, 1);
                }
            });

            this.states[s.id] = c;
        });
    };

    // Her birim çıkışında kaynak kademelı azalsın
    socket.on('unit_dispatched', (d) => {
        const scene = window.getPhaserScene();
        const f = scene.states[d.fromId];
        if (f) f.armyCount = d.newFromArmy;
    });

    this.input.on('pointermove', (p) => {
        if (!this.selectedState || !isGameStarted()) return;

        this.graphics.clear();

        for (let id in this.states) {
            const target = this.states[id];
            if (target === this.selectedState) continue;

            const dist = Phaser.Math.Distance.Between(p.x, p.y, target.x, target.y);
            if (dist < 35) {
                if (!this.hoveredTargets.find(t => t.stateId === target.stateId)) {
                    this.hoveredTargets.push(target);
                    target.setStrokeStyle(3, 0x00d2ff, 0.8);
                }
            }
        }

        if (this.hoveredTargets.length > 0) {
            this.hoveredTargets.forEach(target => {
                this.graphics
                    .lineStyle(2, 0x00d2ff, 0.4)
                    .lineBetween(
                        this.selectedState.x, this.selectedState.y,
                        target.x, target.y
                    );
            });
        } else {
            this.graphics
                .lineStyle(3, 0x00d2ff, 0.3)
                .lineBetween(
                    this.selectedState.x, this.selectedState.y,
                    p.x, p.y
                );
        }
    });

    this.input.on('pointerup', () => {
        this.graphics.clear();

        if (this.selectedState && isGameStarted() && this.hoveredTargets.length > 0) {
            const totalArmy = Math.floor(this.selectedState.armyCount - 1);
            if (totalArmy > 0) {
                const perTarget = Math.floor(totalArmy / this.hoveredTargets.length);
                this.hoveredTargets.forEach(target => {
                    if (perTarget > 0) {
                        socket.emit('send_troops', {
                            fromId: this.selectedState.stateId,
                            toId: target.stateId,
                            amount: perTarget
                        });
                    }
                });
            }
        }

        if (this.selectedState) {
            this.selectedState.setStrokeStyle(2, 0xffffff, 0.2);
            this.selectedState = null;
        }
        this.hoveredTargets.forEach(t => t.setStrokeStyle(2, 0xffffff, 0.2));
        this.hoveredTargets = [];
    });
}

function visualizeTroops(scene, f, t, totalAmount, color, dispatchInterval, unitTravelTime) {
    const visibleCount = Math.min(totalAmount, 20);
    const ang = Phaser.Math.Angle.Between(f.x, f.y, t.x, t.y);

    for (let i = 0; i < visibleCount; i++) {
        // Her birim server ile aynı gecikmeyle yola çıksın
        scene.time.delayedCall(i * dispatchInterval, () => {
            if (!isGameStarted()) return;

            const spread = 6;
            const offsetX = (Math.random() - 0.5) * spread;
            const offsetY = (Math.random() - 0.5) * spread;

            const startX = f.x + Math.cos(ang) * 38 + offsetX;
            const startY = f.y + Math.sin(ang) * 38 + offsetY;
            const endX = t.x - Math.cos(ang) * 38 + offsetX;
            const endY = t.y - Math.sin(ang) * 38 + offsetY;

            const unit = scene.add.circle(startX, startY, 5, color)
                .setStrokeStyle(1, 0xffffff, 0.4)
                .setDepth(10);
            const trail = scene.add.circle(startX, startY, 3, color, 0.3)
                .setDepth(9);

            // Animasyon süresi = unitTravelTime — uzak kale gerçekten uzun sürer
            scene.tweens.add({
                targets: unit,
                x: endX,
                y: endY,
                duration: unitTravelTime,
                ease: 'Linear',
                onUpdate: () => {
                    trail.setPosition(
                        unit.x - Math.cos(ang) * 8,
                        unit.y - Math.sin(ang) * 8
                    );
                },
                onComplete: () => {
                    unit.destroy();
                    trail.destroy();
                }
            });
        });
    }
}

function gameUpdate() {
    if (!isGameStarted()) return;
    for (let id in this.states) {
        const s = this.states[id];
        s.textElement.setText(Math.max(0, Math.floor(s.armyCount)));
    }
}