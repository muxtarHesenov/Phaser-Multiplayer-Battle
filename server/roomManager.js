let players = {
    p1: { id: null, ready: false, name: "Oyuncu 1", lastPing: null },
    p2: { id: null, ready: false, name: "Oyuncu 2", lastPing: null }
};

let selectedMapKey = null;
let io = null;

function initRoomManager(mapKeys, ioInstance) {
    selectedMapKey = mapKeys[0];
    io = ioInstance;
    startHeartbeatCheck();
}

function assignRole(socketId) {
    if (!players.p1.id) { players.p1.id = socketId; players.p1.lastPing = Date.now(); return 'p1'; }
    if (!players.p2.id) { players.p2.id = socketId; players.p2.lastPing = Date.now(); return 'p2'; }
    return 'spectator';
}

function resetPlayer(role) {
    if (players[role]) {
        players[role].id = null;
        players[role].ready = false;
        players[role].lastPing = null;
    }
}

function updatePing(role) {
    if (players[role]) players[role].lastPing = Date.now();
}

function setPlayerName(role, name) {
    if (players[role]) players[role].name = String(name).slice(0, 12);
}

function setPlayerReady(role) {
    if (players[role]) players[role].ready = true;
}

function bothReady() {
    return players.p1.ready && players.p2.ready;
}

function setSelectedMap(mapKey) {
    selectedMapKey = mapKey;
}

function getSelectedMap() {
    return selectedMapKey;
}

function getPlayers() {
    return players;
}

function startHeartbeatCheck() {
    setInterval(() => {
        const now = Date.now();
        let changed = false;

        ['p1', 'p2'].forEach(role => {
            const p = players[role];
            // Bağlı ama 8 saniyedir ping gelmemiş
            if (p.id && p.lastPing && (now - p.lastPing > 8000)) {
                console.log(`${role} heartbeat kesildi, slot boşaltılıyor.`);
                resetPlayer(role);
                changed = true;
            }
        });

        if (changed && io) {
            io.emit('reset_to_lobby');
        }
    }, 5000);
}

module.exports = {
    initRoomManager, assignRole, resetPlayer, updatePing,
    setPlayerName, setPlayerReady, bothReady,
    setSelectedMap, getSelectedMap, getPlayers
};