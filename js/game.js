const socket = io();
let myRole, gameStarted = false, playersData = {};

const lobbyUI = document.getElementById('lobby-ui'), readyBtn = document.getElementById('ready-btn');
const nameInput = document.getElementById('username-input'), mapList = document.getElementById('map-list');
const slotP1 = document.getElementById('slot-p1'), slotP2 = document.getElementById('slot-p2');

nameInput.oninput = () => socket.emit('update_name', nameInput.value || "OYUNCU");
readyBtn.onclick = () => { socket.emit('player_ready'); readyBtn.disabled = true; nameInput.disabled = true; };

socket.on('assign_role', (role) => myRole = role);

const translations = {
    tr: {
        title: "STATE.IO <span class='neon-text'>TACTICS</span>",
        placeholder: " İSİM...",
        mapHeader: "HARİTALAR",
        wait: "İsmi girin ve harita seçin.",
        ready: "HAZIR OL",
        p1: "P1: BEKLENİYOR...",
        p2: "P2: BEKLENİYOR...",
        vs: "VS",
        win: "OYUN TAMAMLANDI\nKAZANAN: "
    },
    ru: {
        title: "STATE.IO <span class='neon-text'>ТАКТИКА</span>",
        placeholder: "ИМЯ...",
        mapHeader: "ЗОНА ",
        wait: "Введите имя и выберите зону.",
        ready: "ГОТОВ",
        p1: "И1: ОЖИДАНИЕ...",
        p2: "И2: ОЖИДАНИЕ...",
        vs: "ПРОТИВ",
        win: "ОПЕРАЦИЯ ЗАВЕРШЕНА\nПОБЕДИТЕЛЬ: "
    }
};

let currentLang = 'tr';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.getElementById('game-title').innerHTML = t.title;
    document.getElementById('username-input').placeholder = t.placeholder;
    document.querySelector('#map-selection-area h3').innerText = t.mapHeader;
    document.getElementById('wait-msg').innerText = t.wait;
    document.getElementById('ready-btn').innerText = t.ready;
    document.querySelector('.vs-badge').innerText = t.vs;
}

socket.on('update_lobby', (p) => {
    playersData = p;
    slotP1.querySelector('.name').innerText = p.p1.name + (p.p1.ready ? ' ✔' : '');
    slotP2.querySelector('.name').innerText = p.p2.name + (p.p2.ready ? ' ✔' : '');
    if (myRole !== 'spectator' && p.p1.id && p.p2.id) readyBtn.style.display = "block";
});

socket.on('init_maps', (data) => {
    mapList.innerHTML = "";
    data.mapList.forEach(m => {
        const b = document.createElement('div'); b.className = 'map-item'; b.innerText = m;
        b.onclick = () => { if(!readyBtn.disabled) socket.emit('change_map', m); };
        mapList.appendChild(b);
    });
    updateMapUI(data.currentMap);
});

socket.on('map_updated', updateMapUI);

socket.on('start_game', (mapData) => {
    lobbyUI.style.display = "none";
    gameStarted = true;
    const scene = game.scene.scenes[0];
    scene.buildMap(mapData);
});

socket.on('reset_to_lobby', () => location.reload());
socket.on('announce_winner', (w) => { gameStarted = false; showGameOver(w); });

function updateMapUI(m) {
    document.querySelectorAll('.map-item').forEach(el => el.classList.toggle('active', el.innerText === m));
    document.getElementById('selected-map-desc').innerText = "Hedef: " + m;
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    backgroundColor: '#0f0f13',
    scene: { create: create, update: update }
};
const game = new Phaser.Game(config);

function create() {
    this.states = {}; this.graphics = this.add.graphics();
    this.buildMap = (data) => {
        data.states.forEach(s => {
            let glow = this.add.circle(s.x, s.y, 42, s.color, 0.15);
            let c = this.add.circle(s.x, s.y, 35, s.color);
            c.setStrokeStyle(2, 0xffffff, 0.2);
            c.setInteractive(new Phaser.Geom.Circle(35, 35, 35), Phaser.Geom.Circle.Contains);
            let t = this.add.text(s.x, s.y, s.armyCount, { fontSize: '16px', fontWeight: 'bold', fill: '#fff', fontFamily: 'Orbitron' }).setOrigin(0.5);
            Object.assign(c, { stateId: s.id, armyCount: s.armyCount, regenRate: s.regenRate, textElement: t, owner: s.owner, fillColor: s.color, glow: glow });
            c.on('pointerdown', () => { if (c.owner === myRole && gameStarted) { this.selectedState = c; c.setStrokeStyle(4, 0xffffff, 1); } });
            this.states[s.id] = c;
        });
    };

    socket.on('receive_troops', (d) => {
        const f = this.states[d.fromId], t = this.states[d.toId];
        if (f && t) visualizeTroops.call(this, f, t, d.amount, f.fillColor, f.owner);
    });

    this.input.on('pointermove', (p) => { 
        if (this.selectedState && gameStarted) { 
            this.graphics.clear().lineStyle(3, 0x00d2ff, 0.5).lineBetween(this.selectedState.x, this.selectedState.y, p.x, p.y); 
        } 
    });

    this.input.on('pointerup', (p, over) => {
        this.graphics.clear();
        if (this.selectedState && over[0] && over[0].stateId && over[0] !== this.selectedState && gameStarted) {
            const amt = Math.floor(this.selectedState.armyCount - 1);
            if (amt > 0) {
                visualizeTroops.call(this, this.selectedState, over[0], amt, this.selectedState.fillColor, this.selectedState.owner);
                socket.emit('send_troops', { fromId: this.selectedState.stateId, toId: over[0].stateId, amount: amt });
            }
        }
        if (this.selectedState) { this.selectedState.setStrokeStyle(2, 0xffffff, 0.2); this.selectedState = null; }
    });
}

function visualizeTroops(f, t, a, c, o) {
    const limit = Math.min(a, 15), step = a / limit, ang = Phaser.Math.Angle.Between(f.x, f.y, t.x, t.y);
    for (let i = 0; i < limit; i++) {
        this.time.delayedCall(i * 50, () => {
            f.armyCount -= step;
            let u = this.add.circle(f.x + Math.cos(ang) * 35, f.y + Math.sin(ang) * 35, 5, c).setStrokeStyle(1, 0xffffff, 0.5);
            this.tweens.add({ targets: u, x: t.x - Math.cos(ang) * 35, y: t.y - Math.sin(ang) * 35, duration: 800, ease: 'Power1', onComplete: () => { handleArrival.call(this, t, o, c, step); u.destroy(); } });
        });
    }
}

function handleArrival(t, o, c, s) {
    if (t.owner === o) t.armyCount += s;
    else {
        t.armyCount -= s;
        if (t.armyCount <= 0) { 
            t.armyCount = Math.abs(t.armyCount) + 1; t.owner = o; t.setFillStyle(c); t.fillColor = c; t.glow.setFillStyle(c, 0.15); t.regenRate = 1.2; 
            checkWin.call(this); 
        }
    }
}

function checkWin() {
    let p1 = 0, p2 = 0;
    for (let id in this.states) { if (this.states[id].owner === 'p1') p1++; if (this.states[id].owner === 'p2') p2++; }
    if (gameStarted) { if (p1 === 0) socket.emit('game_over', 'p2'); else if (p2 === 0) socket.emit('game_over', 'p1'); }
}

function showGameOver(w) {
    const name = playersData[w].name;
    const scene = game.scene.scenes[0];
    scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.8).setDepth(2000);
    scene.add.text(400, 300, `OPERASYON TAMAMLANDI\nKAZANAN: ${name.toUpperCase()}`, { fontSize: '32px', fill: '#00d2ff', align: 'center', fontFamily: 'Orbitron' }).setOrigin(0.5).setDepth(2001);
    setTimeout(() => location.reload(), 5000);
}

function update(t, d) {
    if (!gameStarted) return;
    for (let id in this.states) {
        let s = this.states[id];
        if (s.owner !== 'neutral') s.armyCount += (s.regenRate * d) / 1000;
        s.textElement.setText(Math.max(0, Math.floor(s.armyCount)));
    }
}