// Product Data
const products = [
    {
        id: 1,
        name: "Classic White Tee",
        category: "classic",
        price: 29.99,
        description: "A timeless essential. Our classic white tee is made from 100% organic cotton for unmatched comfort and durability.",
        colors: ["#FFFFFF", "#F8F8F8", "#E8E8E8"],
        icon: "👕",
        featured: true
    },
    {
        id: 2,
        name: "Midnight Black Tee",
        category: "classic",
        price: 29.99,
        description: "Sleek and versatile. This premium black tee pairs perfectly with any outfit and never goes out of style.",
        colors: ["#000000", "#1A1A1A", "#2D2D2D"],
        icon: "👔",
        featured: true
    },
    {
        id: 3,
        name: "Ocean Blue Tee",
        category: "classic",
        price: 32.99,
        description: "Dive into comfort with our ocean blue tee. Perfect for casual days and beach vibes.",
        colors: ["#0077BE", "#4A90E2", "#1E90FF"],
        icon: "🌊",
        featured: true
    },
    {
        id: 4,
        name: "Forest Green Tee",
        category: "classic",
        price: 32.99,
        description: "Embrace nature with this earthy forest green tee. Made from sustainable materials.",
        colors: ["#228B22", "#2D5016", "#3D7834"],
        icon: "🌲",
        featured: false
    },
    {
        id: 5,
        name: "Sunset Orange Tee",
        category: "classic",
        price: 32.99,
        description: "Bright and bold. Stand out with this vibrant sunset orange tee.",
        colors: ["#FF6347", "#FF8C00", "#FFA500"],
        icon: "🌅",
        featured: false
    },
    {
        id: 6,
        name: "Urban Graphic Tee",
        category: "graphic",
        price: 39.99,
        description: "Express your creativity with our urban graphic collection. Features original street art designs.",
        colors: ["#FFFFFF", "#000000", "#808080"],
        icon: "🎨",
        featured: true
    },
    {
        id: 7,
        name: "Vintage Logo Tee",
        category: "graphic",
        price: 37.99,
        description: "Retro vibes with modern comfort. Our vintage logo collection brings back the classics.",
        colors: ["#FFF8DC", "#F5DEB3", "#D2B48C"],
        icon: "📻",
        featured: false
    },
    {
        id: 8,
        name: "Mountain Explorer Tee",
        category: "graphic",
        price: 39.99,
        description: "For the adventurer in you. Features stunning mountain landscape graphics.",
        colors: ["#4A5859", "#2F4F4F", "#708090"],
        icon: "⛰️",
        featured: true
    },
    {
        id: 9,
        name: "Wave Rider Tee",
        category: "graphic",
        price: 39.99,
        description: "Catch the wave with this surfer-inspired graphic tee. Perfect for beach lovers.",
        colors: ["#00CED1", "#20B2AA", "#48D1CC"],
        icon: "🏄",
        featured: false
    },
    {
        id: 10,
        name: "Cosmic Dreams Tee",
        category: "graphic",
        price: 41.99,
        description: "Reach for the stars with our cosmic collection. Features galaxy and space-themed graphics.",
        colors: ["#191970", "#000080", "#4B0082"],
        icon: "🌌",
        featured: false
    },
    {
        id: 11,
        name: "Premium Bamboo Tee",
        category: "premium",
        price: 49.99,
        description: "Luxury meets sustainability. Made from premium bamboo fiber for ultimate softness.",
        colors: ["#F5F5DC", "#FAEBD7", "#FFE4C4"],
        icon: "🎋",
        featured: true
    },
    {
        id: 12,
        name: "Silk Blend Tee",
        category: "premium",
        price: 59.99,
        description: "Experience luxury with our silk-blend tee. Unparalleled softness and breathability.",
        colors: ["#E6E6FA", "#D8BFD8", "#DDA0DD"],
        icon: "✨",
        featured: false
    },
    {
        id: 13,
        name: "Merino Wool Tee",
        category: "premium",
        price: 64.99,
        description: "Premium merino wool tee for all-season comfort. Temperature regulating and odor resistant.",
        colors: ["#8B7355", "#A0826D", "#C9A88A"],
        icon: "🐑",
        featured: false
    },
    {
        id: 14,
        name: "Athletic Performance Tee",
        category: "premium",
        price: 44.99,
        description: "Engineered for performance. Moisture-wicking fabric keeps you cool and dry.",
        colors: ["#FF0000", "#0000FF", "#00FF00"],
        icon: "⚡",
        featured: false
    },
    {
        id: 15,
        name: "Heritage Henley",
        category: "premium",
        price: 54.99,
        description: "Classic henley style with modern comfort. Features premium button details.",
        colors: ["#8B4513", "#A0522D", "#D2691E"],
        icon: "👕",
        featured: true
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
