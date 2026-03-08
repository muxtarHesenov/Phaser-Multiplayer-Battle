# State.io Clone (Multiplayer)

A real-time strategy battle game built with **Phaser 3** and **Socket.io**.

### Features

* **Real-time Multiplayer:** Synchronized troop movements and state captures via WebSockets.
* **Lobby System:** Player naming, role assignment (P1, P2, Spectator), and readiness checks.
* **Map Selection:** 8 unique tactical maps including *Vortex*, *Neural Network*, and *Fortress*.
* **Dynamic Scaling:** Responsive neon UI with a custom grid-based map selector.

### Tech Stack

* **Engine:** Phaser 3
* **Backend:** Node.js / Express
* **Networking:** Socket.io
* **Styling:** CSS3 (Neon/Cyberpunk theme)

### Project Structure

* `server.js`: Node.js server handling socket events and game state.
* `maps.js`: Configuration for node coordinates, regen rates, and initial army counts.
* `js/game.js`: Client-side Phaser scene logic and troop visualizations.
* `css/style.css`: Lobby interface and custom scrollbar styling.

### Installation

1. `git clone https://github.com/muxtarHesenov/Phaser-Multiplayer-Battle.git`
2. `npm install`
3. `npm start`
4. Open `http://localhost:4000`

---

**Live Demo:** https://phaser-multiplayer-battle.onrender.com/
