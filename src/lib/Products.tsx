export interface Product {
    id: string
    name: string
    price: number
    category: "watch" | "perfume"
    image: string
    description: string
    brand: string
    inStock: boolean
}

export const products: Product[] = [
    // Watches
    {
        id: "1",
        name: "Rolex Submariner",
        price: 8500,
        category: "watch",
        image: "/luxury-rolex-submariner-watch-black-dial.jpg",
        description:
            "Iconic diving watch with unidirectional rotating bezel and luminescent markers. Water resistant to 300m.",
        brand: "Rolex",
        inStock: true,
    },
    {
        id: "2",
        name: "Omega Speedmaster",
        price: 5200,
        category: "watch",
        image: "/omega-speedmaster-moonwatch-chronograph.jpg",
        description: "The legendary moonwatch worn by astronauts. Features chronograph function and tachymeter scale.",
        brand: "Omega",
        inStock: true,
    },
    {
        id: "3",
        name: "TAG Heuer Carrera",
        price: 3800,
        category: "watch",
        image: "/tag-heuer-carrera-racing-watch-steel.jpg",
        description: "Racing-inspired chronograph with sleek design and precision Swiss movement.",
        brand: "TAG Heuer",
        inStock: true,
    },
    {
        id: "4",
        name: "Seiko Prospex",
        price: 450,
        category: "watch",
        image: "/seiko-prospex-dive-watch-automatic.jpg",
        description: "Professional diving watch with automatic movement and 200m water resistance.",
        brand: "Seiko",
        inStock: true,
    },
    // Perfumes
    {
        id: "5",
        name: "Chanel No. 5",
        price: 150,
        category: "perfume",
        image: "/chanel-no-5-perfume-bottle-elegant.jpg",
        description: "The world's most iconic fragrance with notes of ylang-ylang, rose, and sandalwood.",
        brand: "Chanel",
        inStock: true,
    },
    {
        id: "6",
        name: "Dior Sauvage",
        price: 120,
        category: "perfume",
        image: "/dior-sauvage-cologne-bottle-masculine.jpg",
        description: "Fresh and raw fragrance with bergamot, pepper, and ambroxan. Perfect for the modern man.",
        brand: "Dior",
        inStock: true,
    },
    {
        id: "7",
        name: "Tom Ford Black Orchid",
        price: 180,
        category: "perfume",
        image: "/tom-ford-black-orchid-luxury-perfume.jpg",
        description: "Luxurious and sensual fragrance with black orchid, spice, and dark chocolate notes.",
        brand: "Tom Ford",
        inStock: true,
    },
    {
        id: "8",
        name: "Versace Eros",
        price: 95,
        category: "perfume",
        image: "/versace-eros-cologne-blue-bottle.jpg",
        description: "Passionate and masculine scent with mint, apple, and vanilla. Inspired by Greek mythology.",
        brand: "Versace",
        inStock: true,
    },
]

export const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: "watch" | "perfume"): Product[] => {
    return products.filter((product) => product.category === category)
}
