const socket = io();

// Heartbeat — her 3 saniyede server'a ping at
setInterval(() => {
    socket.emit('ping');
}, 3000);

let myRole = null;
let playersData = {};
let gameStarted = false;

function getMyRole() { return myRole; }
function getPlayersData() { return playersData; }
function isGameStarted() { return gameStarted; }
function setGameStarted(val) { gameStarted = val; }

socket.on('assign_role', (role) => {
    myRole = role;
});

socket.on('update_lobby', (p) => {
    playersData = p;
    updateLobby(p, myRole);
});

socket.on('init_maps', (data) => {
    const readyBtn = document.getElementById('ready-btn');
    buildMapList(data.mapList, data.currentMap, (m) => {
        if (!readyBtn.disabled) socket.emit('change_map', m);
    });
});

socket.on('map_updated', (m) => {
    updateMapUI(m);
});

socket.on('start_game', (mapData) => {
    document.getElementById('lobby-ui').style.display = "none";
    gameStarted = true;
    window.getPhaserScene().buildMap(mapData);
});

socket.on('reset_to_lobby', () => location.reload());

socket.on('announce_winner', (w) => {
    gameStarted = false;
    showGameOver(w, playersData);
});

socket.on('regen_update', (updates) => {
    const scene = window.getPhaserScene();
    if (!scene || !scene.states) return;
    for (let id in updates) {
        const s = scene.states[id];
        if (s) s.armyCount = updates[id];
    }
});

socket.on('receive_troops', (d) => {
    const scene = window.getPhaserScene();
    const f = scene.states[d.fromId];
    const t = scene.states[d.toId];
    if (!f || !t) return;
    visualizeTroops(scene, f, t, d.amount, d.senderColor, d.dispatchInterval, d.unitTravelTime);
});

socket.on('troop_arrived', (d) => {
    const scene = window.getPhaserScene();
    const t = scene.states[d.toId];
    if (!t) return;
    t.armyCount = d.newToArmy;
    if (d.ownerChanged) {
        t.owner = d.newToOwner;
        t.setFillStyle(d.newToColor);
        t.fillColor = d.newToColor;
        t.glow.setFillStyle(d.newToColor, 0.15);
    }
});

// Lobby input eventleri
document.getElementById('username-input').oninput = (e) => {
    socket.emit('update_name', e.target.value || "OYUNCU");
};

document.getElementById('ready-btn').onclick = () => {
    socket.emit('player_ready');
    document.getElementById('ready-btn').disabled = true;
    document.getElementById('username-input').disabled = true;
};