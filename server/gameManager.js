let gameState = {};
let gameActive = false;
let io = null;

function init(ioInstance) {
    io = ioInstance;
}

function getGameActive() { return gameActive; }
function setGameActive(val) { gameActive = val; }
function getGameState() { return gameState; }

function getPlayerColor(role) {
    return role === 'p1' ? 0xff4757 : 0x2e86de;
}

function initGameState(mapData) {
    gameState = {};
    mapData.states.forEach(s => {
        gameState[s.id] = {
            id: s.id,
            owner: s.owner,
            armyCount: s.armyCount,
            regenRate: s.regenRate,
            capturedRegenRate: s.capturedRegenRate || 1.2,
            color: s.color,
            x: s.x,
            y: s.y
        };
    });
}

function checkWinCondition() {
    let p1 = 0, p2 = 0;
    for (let id in gameState) {
        if (gameState[id].owner === 'p1') p1++;
        if (gameState[id].owner === 'p2') p2++;
    }
    if (p1 === 0 && p2 > 0) return 'p2';
    if (p2 === 0 && p1 > 0) return 'p1';
    return null;
}

function resetGame() {
    gameState = {};
    gameActive = false;
}

function startRegenLoop() {
    setInterval(() => {
        if (!gameActive) return;
        const updates = {};
        for (let id in gameState) {
            const s = gameState[id];
            if (s.owner !== 'neutral' && s.regenRate > 0) {
                s.armyCount += s.regenRate * 0.5;
                updates[id] = Math.floor(s.armyCount);
            }
        }
        if (Object.keys(updates).length > 0) {
            io.emit('regen_update', updates);
        }
    }, 500);
}

module.exports = {
    init, getGameActive, setGameActive,
    getGameState, getPlayerColor,
    initGameState, checkWinCondition,
    resetGame, startRegenLoop
};