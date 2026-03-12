const translations = {
    tr: {
        title: "STATE.IO <span class='neon-text'>TACTICS</span>",
        placeholder: "İSİM...",
        mapHeader: "HARİTALAR",
        wait: "İsmi girin ve harita seçin.",
        ready: "HAZIR OL",
        vs: "VS"
    },
    ru: {
        title: "STATE.IO <span class='neon-text'>ТАКТИКА</span>",
        placeholder: "ИМЯ...",
        mapHeader: "ЗОНА",
        wait: "Введите имя и выберите зону.",
        ready: "ГОТОВ",
        vs: "ПРОТИВ"
    }
};

function setLanguage(lang) {
    const t = translations[lang];
    document.getElementById('game-title').innerHTML = t.title;
    document.getElementById('username-input').placeholder = t.placeholder;
    document.querySelector('#map-selection-area h3').innerText = t.mapHeader;
    document.getElementById('wait-msg').innerText = t.wait;
    document.getElementById('ready-btn').innerText = t.ready;
    document.querySelector('.vs-badge').innerText = t.vs;
}

function updateLobby(p, myRole) {
    const slotP1 = document.getElementById('slot-p1');
    const slotP2 = document.getElementById('slot-p2');
    const readyBtn = document.getElementById('ready-btn');

    slotP1.querySelector('.name').innerText = p.p1.name + (p.p1.ready ? ' ✔' : '');
    slotP2.querySelector('.name').innerText = p.p2.name + (p.p2.ready ? ' ✔' : '');

    if (myRole !== 'spectator' && p.p1.id && p.p2.id) {
        readyBtn.style.display = "block";
    }
}

function buildMapList(mapNames, currentMap, onSelect) {
    const mapList = document.getElementById('map-list');
    mapList.innerHTML = "";
    mapNames.forEach(m => {
        const b = document.createElement('div');
        b.className = 'map-item';
        b.innerText = m;
        b.onclick = () => onSelect(m);
        mapList.appendChild(b);
    });
    updateMapUI(currentMap);
}

function updateMapUI(m) {
    document.querySelectorAll('.map-item').forEach(el => {
        el.classList.toggle('active', el.innerText === m);
    });
    document.getElementById('selected-map-desc').innerText = "Hedef: " + m;
}

function showGameOver(role, playersData) {
    const name = playersData[role] ? playersData[role].name : role;
    const scene = window.getPhaserScene();
    scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.8).setDepth(2000);
    scene.add.text(400, 300,
        `OPERASYON TAMAMLANDI\nKAZANAN: ${name.toUpperCase()}`,
        { fontSize: '32px', fill: '#00d2ff', align: 'center', fontFamily: 'Orbitron' }
    ).setOrigin(0.5).setDepth(2001);
    setTimeout(() => location.reload(), 5000);
}