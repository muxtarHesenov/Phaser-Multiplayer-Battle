const maps = {

    "Çarpı": {
        id: "cross",
        description: "4 kollu harita. Merkezi kim alırsa savaşı yönetir.",
        states: [
            { id: 1, x: 80,  y: 300, color: 0xff4757, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2, x: 720, y: 300, color: 0x2e86de, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3, x: 400, y: 80,  color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.8, owner: 'neutral' },
            { id: 4, x: 400, y: 520, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.8, owner: 'neutral' },
            { id: 5, x: 400, y: 300, color: 0xaaaaaa, armyCount: 25, regenRate: 0, capturedRegenRate: 2.5, owner: 'neutral' },
            { id: 6, x: 220, y: 300, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 7, x: 580, y: 300, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 8, x: 400, y: 190, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
            { id: 9, x: 400, y: 410, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
        ]
    },

    "Elmas": {
        id: "diamond",
        description: "Köşegen simetri. Üst-alt veya yan hat — hangisini seçersin?",
        states: [
            { id: 1, x: 80,  y: 300, color: 0xff4757, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2, x: 720, y: 300, color: 0x2e86de, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3, x: 400, y: 80,  color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 4, x: 400, y: 520, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 5, x: 400, y: 300, color: 0xaaaaaa, armyCount: 30, regenRate: 0, capturedRegenRate: 3.0, owner: 'neutral' },
            { id: 6, x: 240, y: 190, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 7, x: 560, y: 190, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 8, x: 240, y: 410, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 9, x: 560, y: 410, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
        ]
    },

    "Kanatlar": {
        id: "wings",
        description: "İki kanat, bir boğaz. Ortayı geç, her ikisini kes.",
        states: [
            { id: 1,  x: 80,  y: 150, color: 0xff4757, armyCount: 18, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2,  x: 720, y: 150, color: 0x2e86de, armyCount: 18, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3,  x: 80,  y: 450, color: 0xff4757, armyCount: 18, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 4,  x: 720, y: 450, color: 0x2e86de, armyCount: 18, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 5,  x: 400, y: 300, color: 0xaaaaaa, armyCount: 35, regenRate: 0, capturedRegenRate: 3.0, owner: 'neutral' },
            { id: 6,  x: 210, y: 150, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 7,  x: 590, y: 150, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 8,  x: 210, y: 450, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 9,  x: 590, y: 450, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 10, x: 400, y: 150, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 11, x: 400, y: 450, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
        ]
    },

    "Üç Köprü": {
        id: "three_bridges",
        description: "Üst, orta, alt — üç farklı hat. Hangisinden geçeceksin?",
        states: [
            { id: 1,  x: 80,  y: 300, color: 0xff4757, armyCount: 25, regenRate: 2.0, capturedRegenRate: 2.0, owner: 'p1' },
            { id: 2,  x: 720, y: 300, color: 0x2e86de, armyCount: 25, regenRate: 2.0, capturedRegenRate: 2.0, owner: 'p2' },
            { id: 3,  x: 280, y: 150, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 4,  x: 520, y: 150, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 5,  x: 280, y: 300, color: 0xaaaaaa, armyCount: 18, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 6,  x: 520, y: 300, color: 0xaaaaaa, armyCount: 18, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 7,  x: 280, y: 450, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 8,  x: 520, y: 450, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 9,  x: 400, y: 150, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
            { id: 10, x: 400, y: 300, color: 0xaaaaaa, armyCount: 25, regenRate: 0, capturedRegenRate: 2.5, owner: 'neutral' },
            { id: 11, x: 400, y: 450, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
        ]
    },

    "Yıldız": {
        id: "star",
        description: "6 kollu yıldız. Merkezi al, her kola hükmet.",
        states: [
            { id: 1, x: 80,  y: 300, color: 0xff4757, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2, x: 720, y: 300, color: 0x2e86de, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3, x: 400, y: 300, color: 0xaaaaaa, armyCount: 30, regenRate: 0, capturedRegenRate: 3.0, owner: 'neutral' },
            { id: 4, x: 240, y: 170, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 5, x: 560, y: 170, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 6, x: 240, y: 430, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 7, x: 560, y: 430, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 8, x: 400, y: 90,  color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
            { id: 9, x: 400, y: 510, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
        ]
    },

    "Kale": {
        id: "fortress",
        description: "İki savunma hattı. Duvarlı geçit — tek yol ileri.",
        states: [
            { id: 1,  x: 80,  y: 300, color: 0xff4757, armyCount: 25, regenRate: 2.0, capturedRegenRate: 2.0, owner: 'p1' },
            { id: 2,  x: 720, y: 300, color: 0x2e86de, armyCount: 25, regenRate: 2.0, capturedRegenRate: 2.0, owner: 'p2' },
            { id: 3,  x: 200, y: 200, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 4,  x: 200, y: 400, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 5,  x: 600, y: 200, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 6,  x: 600, y: 400, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 7,  x: 320, y: 200, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 8,  x: 320, y: 400, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 9,  x: 480, y: 200, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 10, x: 480, y: 400, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 11, x: 400, y: 300, color: 0xaaaaaa, armyCount: 35, regenRate: 0, capturedRegenRate: 3.5, owner: 'neutral' },
        ]
    },

    "Göbekli": {
        id: "hub",
        description: "Merkez + 4 kol + aralarında köprüler. Her yön saldırıya açık.",
        states: [
            { id: 1,  x: 80,  y: 300, color: 0xff4757, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2,  x: 720, y: 300, color: 0x2e86de, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3,  x: 400, y: 300, color: 0xaaaaaa, armyCount: 30, regenRate: 0, capturedRegenRate: 3.0, owner: 'neutral' },
            { id: 4,  x: 400, y: 120, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 5,  x: 400, y: 480, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 6,  x: 220, y: 300, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 7,  x: 580, y: 300, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 8,  x: 310, y: 210, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
            { id: 9,  x: 490, y: 210, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
            { id: 10, x: 310, y: 390, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
            { id: 11, x: 490, y: 390, color: 0xaaaaaa, armyCount: 8,  regenRate: 0, capturedRegenRate: 1.0, owner: 'neutral' },
        ]
    },

    "Oklava": {
        id: "pincer",
        description: "Kuşatma haritası. Üstten mi alttan mı — ikisinden birden mi?",
        states: [
            { id: 1, x: 80,  y: 300, color: 0xff4757, armyCount: 22, regenRate: 1.8, capturedRegenRate: 1.8, owner: 'p1' },
            { id: 2, x: 720, y: 300, color: 0x2e86de, armyCount: 22, regenRate: 1.8, capturedRegenRate: 1.8, owner: 'p2' },
            { id: 3, x: 200, y: 120, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 4, x: 200, y: 480, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 5, x: 600, y: 120, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 6, x: 600, y: 480, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 7, x: 400, y: 120, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.5, owner: 'neutral' },
            { id: 8, x: 400, y: 480, color: 0xaaaaaa, armyCount: 20, regenRate: 0, capturedRegenRate: 2.5, owner: 'neutral' },
            { id: 9, x: 400, y: 300, color: 0xaaaaaa, armyCount: 25, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
        ]
    },

    "Zigzag": {
        id: "zigzag",
        description: "Kırık hat. Düz gitme, köşe döndür.",
        states: [
            { id: 1, x: 80,  y: 300, color: 0xff4757, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2, x: 720, y: 300, color: 0x2e86de, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3, x: 200, y: 150, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 4, x: 320, y: 400, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 1.8, owner: 'neutral' },
            { id: 5, x: 440, y: 150, color: 0xaaaaaa, armyCount: 15, regenRate: 0, capturedRegenRate: 1.8, owner: 'neutral' },
            { id: 6, x: 560, y: 400, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 7, x: 680, y: 150, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 8, x: 200, y: 450, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
            { id: 9, x: 680, y: 450, color: 0xaaaaaa, armyCount: 10, regenRate: 0, capturedRegenRate: 1.2, owner: 'neutral' },
        ]
    },

    "İkiz Kule": {
        id: "twin_towers",
        description: "İki paralel grup ve merkez. Kolunu güçlendir, ortayı kır.",
        states: [
            { id: 1,  x: 120, y: 200, color: 0xff4757, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p1' },
            { id: 2,  x: 680, y: 200, color: 0x2e86de, armyCount: 20, regenRate: 1.5, capturedRegenRate: 1.5, owner: 'p2' },
            { id: 3,  x: 120, y: 400, color: 0xff4757, armyCount: 15, regenRate: 1.2, capturedRegenRate: 1.2, owner: 'p1' },
            { id: 4,  x: 680, y: 400, color: 0x2e86de, armyCount: 15, regenRate: 1.2, capturedRegenRate: 1.2, owner: 'p2' },
            { id: 5,  x: 250, y: 200, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 6,  x: 550, y: 200, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 7,  x: 250, y: 400, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 8,  x: 550, y: 400, color: 0xaaaaaa, armyCount: 12, regenRate: 0, capturedRegenRate: 1.5, owner: 'neutral' },
            { id: 9,  x: 250, y: 300, color: 0xaaaaaa, armyCount: 18, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 10, x: 550, y: 300, color: 0xaaaaaa, armyCount: 18, regenRate: 0, capturedRegenRate: 2.0, owner: 'neutral' },
            { id: 11, x: 400, y: 300, color: 0xaaaaaa, armyCount: 30, regenRate: 0, capturedRegenRate: 3.0, owner: 'neutral' },
        ]
    },

};

module.exports = maps;