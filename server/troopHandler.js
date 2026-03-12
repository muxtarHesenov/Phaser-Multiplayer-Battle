const {
    getGameActive, setGameActive,
    getGameState, getPlayerColor,
    checkWinCondition
} = require('./gameManager');

function registerTroopHandler(socket, io, role) {
    socket.on('send_troops', (data) => {
        if (!getGameActive()) return;

        const { fromId, toId, amount } = data;
        const gameState = getGameState();
        const from = gameState[fromId];
        const to = gameState[toId];

        if (!from || !to) return;
        if (from.owner !== role) return;

        const safeAmount = Math.floor(Math.min(amount, from.armyCount - 1));
        if (safeAmount <= 0) return;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Her birim için çıkış gecikmesi ve yolculuk süresi ayrı
        const visibleCount = Math.min(safeAmount, 20);
        const dispatchInterval = 200; // her asker 120ms arayla çıksın
        const unitTravelTime = Math.max(500, distance * 4.0); // uzaklığa göre yolculuk
        const unitValue = safeAmount / visibleCount;

        for (let i = 0; i < visibleCount; i++) {
            const departureDelay = i * dispatchInterval;
            const arrivalDelay = departureDelay + unitTravelTime;

            // Her birimi ayrı ayrı çıkar — çıkışta kaynaktan düş
            setTimeout(() => {
                if (!getGameActive()) return;
                from.armyCount -= unitValue;

                // Çıkış anını client'a bildir
                io.emit('unit_dispatched', {
                    fromId,
                    newFromArmy: from.armyCount
                });
            }, departureDelay);

            // Varışta hedefe uygula
            setTimeout(() => {
                if (!getGameActive()) return;

                let ownerChanged = false;
                let newOwner = to.owner;
                let newColor = to.color;

                if (to.owner === role) {
                    to.armyCount += unitValue;
                } else {
                    to.armyCount -= unitValue;
                    if (to.armyCount <= 0) {
                        to.armyCount = Math.abs(to.armyCount) + 1;
                        to.owner = role;
                        to.color = getPlayerColor(role);
                        to.regenRate = to.capturedRegenRate;
                        ownerChanged = true;
                        newOwner = to.owner;
                        newColor = to.color;

                        const winner = checkWinCondition();
                        if (winner) {
                            setGameActive(false);
                            io.emit('announce_winner', winner);
                            return;
                        }
                    }
                }

                io.emit('troop_arrived', {
                    toId,
                    newToArmy: to.armyCount,
                    newToOwner: newOwner,
                    newToColor: newColor,
                    ownerChanged
                });

            }, arrivalDelay);
        }

        // Animasyon için bilgi gönder
        io.emit('receive_troops', {
            fromId,
            toId,
            amount: safeAmount,
            senderRole: role,
            senderColor: getPlayerColor(role),
            dispatchInterval,   // her birimin çıkış aralığı
            unitTravelTime      // her birimin yolculuk süresi
        });
    });
}

module.exports = { registerTroopHandler };