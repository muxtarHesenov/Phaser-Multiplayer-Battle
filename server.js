const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const maps = require('./maps');

const {
    initRoomManager, assignRole, resetPlayer, updatePing,
    setPlayerName, setPlayerReady, bothReady,
    setSelectedMap, getSelectedMap, getPlayers
} = require('./server/roomManager');

const {
    init, getGameActive, setGameActive,
    initGameState, resetGame, startRegenLoop
} = require('./server/gameManager');

const { registerTroopHandler } = require('./server/troopHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

init(io);
initRoomManager(Object.keys(maps), io);
startRegenLoop();

io.on('connection', (socket) => {
    const role = assignRole(socket.id);

    socket.emit('assign_role', role);
    socket.emit('init_maps', {
        mapList: Object.keys(maps),
        currentMap: getSelectedMap()
    });
    io.emit('update_lobby', getPlayers());

    // Heartbeat
    socket.on('ping', () => {
        updatePing(role);
    });

    socket.on('update_name', (name) => {
        setPlayerName(role, name);
        io.emit('update_lobby', getPlayers());
    });

    socket.on('change_map', (mapKey) => {
        if (!getGameActive() && maps[mapKey]) {
            setSelectedMap(mapKey);
            io.emit('map_updated', mapKey);
        }
    });

    socket.on('player_ready', () => {
        const players = getPlayers();
        if (!players[role]) return;

        setPlayerReady(role);
        io.emit('update_lobby', getPlayers());

        if (bothReady()) {
            setGameActive(true);
            const mapData = maps[getSelectedMap()];
            initGameState(mapData);
            io.emit('start_game', mapData);
        }
    });

    registerTroopHandler(socket, io, role);

    socket.on('disconnect', () => {
        const players = getPlayers();
        if (players[role] && players[role].id === socket.id) {
            resetPlayer(role);
            resetGame();
            io.emit('reset_to_lobby');
        }
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Port ${PORT} aktif`));