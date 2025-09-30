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

const perfumesIds = ["20", "23", "24", "25", "26", "27", "28", "29", "31"]

export const products: Product[] = Array.from({ length: 31 }, (_, i) => {
    const index = i + 1
    return {
        id: index.toString(),
        name: `shop-${index}`,
        price: 100 + index * 10,
        category: perfumesIds.includes(index.toString()) ? "perfume" : "watch",
        image: `/shop-${index}.jpeg`,
        description: `Producto shop-${index}`,
        brand: "Generic",
        inStock: true,
    }
})

export const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: "watch" | "perfume"): Product[] => {
    return products.filter((product) => product.category === category)
}
