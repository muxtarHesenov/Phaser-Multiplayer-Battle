const maps = {
    "Klasik Meydan": {
        id: "classic",
        description: "Dengeli ve açık bir savaş alanı.",
        states: [
            { id: 1, x: 150, y: 300, color: 0xff4757, armyCount: 20, regenRate: 1.5, owner: 'p1' },
            { id: 2, x: 650, y: 300, color: 0x2e86de, armyCount: 20, regenRate: 1.5, owner: 'p2' },
            { id: 3, x: 400, y: 150, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 400, y: 450, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Darboğaz (Köprü)": {
        id: "bottleneck",
        description: "Merkezi kontrol eden savaşı kazanır.",
        states: [
            { id: 1, x: 80, y: 300, color: 0xff4757, armyCount: 25, regenRate: 1.8, owner: 'p1' },
            { id: 2, x: 720, y: 300, color: 0x2e86de, armyCount: 25, regenRate: 1.8, owner: 'p2' },
            { id: 3, x: 400, y: 300, color: 0xcccccc, armyCount: 40, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 250, y: 100, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 250, y: 500, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 550, y: 100, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 550, y: 500, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Yarımada": {
        id: "peninsula",
        description: "Köşeye sıkışma! Geniş gövdeyi ele geçir.",
        states: [
            { id: 1, x: 100, y: 100, color: 0xff4757, armyCount: 20, regenRate: 1.5, owner: 'p1' },
            { id: 2, x: 700, y: 500, color: 0x2e86de, armyCount: 20, regenRate: 1.5, owner: 'p2' },
            { id: 3, x: 250, y: 200, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 550, y: 400, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 400, y: 300, color: 0xcccccc, armyCount: 25, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 200, y: 450, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 600, y: 150, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Takımadalar": {
        id: "archipelago",
        description: "Uzak mesafeler, zor zamanlamalar.",
        states: [
            { id: 1, x: 100, y: 300, color: 0xff4757, armyCount: 30, regenRate: 2.0, owner: 'p1' },
            { id: 2, x: 700, y: 300, color: 0x2e86de, armyCount: 30, regenRate: 2.0, owner: 'p2' },
            { id: 3, x: 300, y: 100, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 300, y: 500, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 500, y: 100, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 500, y: 500, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 400, y: 300, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Kıyamet Çemberi": {
        id: "vortex",
        description: "Merkezdeki dev üs her yönden saldırıya açıktır.",
        states: [
            { id: 1, x: 100, y: 100, color: 0xff4757, armyCount: 20, regenRate: 1.5, owner: 'p1' },
            { id: 2, x: 700, y: 500, color: 0x2e86de, armyCount: 20, regenRate: 1.5, owner: 'p2' },
            { id: 3, x: 400, y: 300, color: 0xcccccc, armyCount: 80, regenRate: 0, owner: 'neutral' }, 
            { id: 4, x: 400, y: 100, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 400, y: 500, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 150, y: 500, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 650, y: 100, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 8, x: 100, y: 300, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 9, x: 700, y: 300, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Örümcek Ağı": {
        id: "spider_web",
        description: "Karmaşık bağlantılar. Arkadan sızmak için ideal.",
        states: [
            { id: 1, x: 50, y: 300, color: 0xff4757, armyCount: 15, regenRate: 1.5, owner: 'p1' },
            { id: 2, x: 750, y: 300, color: 0x2e86de, armyCount: 15, regenRate: 1.5, owner: 'p2' },
            { id: 3, x: 250, y: 300, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 550, y: 300, color: 0xcccccc, armyCount: 15, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 400, y: 150, color: 0xcccccc, armyCount: 20, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 400, y: 450, color: 0xcccccc, armyCount: 20, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 200, y: 100, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 8, x: 200, y: 500, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 9, x: 600, y: 100, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 10, x: 600, y: 500, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Büyük Hisar": {
        id: "fortress",
        description: "Yüksek üretimli 3 ana kale. Savaşı domine et.",
        states: [
            { id: 1, x: 100, y: 300, color: 0xff4757, armyCount: 25, regenRate: 1.5, owner: 'p1' },
            { id: 2, x: 700, y: 300, color: 0x2e86de, armyCount: 25, regenRate: 1.5, owner: 'p2' },
            { id: 3, x: 400, y: 300, color: 0xcccccc, armyCount: 50, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 400, y: 100, color: 0xcccccc, armyCount: 30, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 400, y: 500, color: 0xcccccc, armyCount: 30, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 250, y: 200, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 250, y: 400, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 8, x: 550, y: 200, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 9, x: 550, y: 400, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' }
        ]
    },
    "Sinir Ağı": {
        id: "neural",
        description: "Çok sayıda küçük düğüm. Hız her şeydir.",
        states: [
            { id: 1, x: 50, y: 50, color: 0xff4757, armyCount: 10, regenRate: 1.2, owner: 'p1' },
            { id: 2, x: 750, y: 550, color: 0x2e86de, armyCount: 10, regenRate: 1.2, owner: 'p2' },
            { id: 3, x: 150, y: 150, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 4, x: 250, y: 250, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 5, x: 350, y: 350, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 6, x: 450, y: 450, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 7, x: 550, y: 550, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 8, x: 650, y: 450, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 9, x: 550, y: 350, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 10, x: 450, y: 250, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 11, x: 350, y: 150, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 12, x: 250, y: 50, color: 0xcccccc, armyCount: 5, regenRate: 0, owner: 'neutral' },
            { id: 13, x: 150, y: 450, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' },
            { id: 14, x: 650, y: 150, color: 0xcccccc, armyCount: 10, regenRate: 0, owner: 'neutral' }
        ]
    }
};

module.exports = maps;