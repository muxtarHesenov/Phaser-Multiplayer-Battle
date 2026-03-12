# Phaser Multiplayer Battle

A real-time 2-player strategy game built with Phaser 3 and Socket.io.

## Gameplay

Two players compete to capture all territories on the map. Each player starts with their own base and sends troops to neutral or enemy territories. The player who eliminates all enemy territories wins.

- Drag from your territory to a target to send troops
- Hover over multiple targets while dragging to split troops
- Captured territories generate troops over time
- Distance matters — troops take longer to reach farther territories

## Tech Stack

- **Frontend:** Phaser 3, vanilla JS
- **Backend:** Node.js, Express, Socket.io

## Project Structure
```
├── server.js
├── maps.js
├── server/
│   ├── roomManager.js
│   ├── gameManager.js
│   └── troopHandler.js
├── js/
│   ├── game.js
│   ├── socket.js
│   └── ui.js
└── css/
    └── style.css
```

## Getting Started
```bash
npm install
node server.js
```

Open two browser tabs at `http://localhost:4000` to play locally.

## Maps

10 maps with different strategic layouts — Cross, Diamond, Wings, Three Bridges, Star, Fortress, Hub, Pincer, Zigzag, Twin Towers.
