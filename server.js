const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const maps = require('./maps');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let players = {
    p1: { id: null, ready: false, name: "Oyuncu 1" },
    p2: { id: null, ready: false, name: "Oyuncu 2" }
};
let gameActive = false;
let selectedMapKey = Object.keys(maps)[0];

io.on('connection', (socket) => {
    let role = null;
    if (!players.p1.id) { players.p1.id = socket.id; role = 'p1'; }
    else if (!players.p2.id) { players.p2.id = socket.id; role = 'p2'; }
    else { role = 'spectator'; }

    socket.emit('assign_role', role);
    socket.emit('init_maps', { mapList: Object.keys(maps), currentMap: selectedMapKey });
    io.emit('update_lobby', players);

    socket.on('update_name', (name) => {
        if (players[role]) { players[role].name = name; io.emit('update_lobby', players); }
    });

    socket.on('change_map', (mapKey) => {
        if (!gameActive && maps[mapKey]) {
            selectedMapKey = mapKey;
            io.emit('map_updated', selectedMapKey);
        }
    });

    socket.on('player_ready', () => {
        if (players[role]) {
            players[role].ready = true;
            io.emit('update_lobby', players);
            if (players.p1.ready && players.p2.ready) {
                gameActive = true;
                io.emit('start_game', maps[selectedMapKey]);
            }
        }
    });

    socket.on('send_troops', (data) => socket.broadcast.emit('receive_troops', data));
    socket.on('game_over', (winner) => { if(gameActive) { gameActive = false; io.emit('announce_winner', winner); } });

    socket.on('disconnect', () => {
        if (players[role] && players[role].id === socket.id) {
            players[role].id = null; players[role].ready = false;
            gameActive = false;
            io.emit('reset_to_lobby');
        }
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Port ${PORT}`));