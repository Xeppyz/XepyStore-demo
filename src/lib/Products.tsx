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

const perfumesIds = ["20", "23", "24", "25", "26", "27", "28", "29", "31", "32", "33", "34", "35", "36"]
const inStockIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "12", "13", "14", "15", "18", "10", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "33", "34", "35", "36"]

export const products: Product[] = Array.from({ length: 36 }, (_, i) => {
    const index = i + 1
    return {
        id: index.toString(),
        name: `shop-${index}`,
        price: 100 + index * 10,
        category: perfumesIds.includes(index.toString()) ? "perfume" : "watch",
        image: `/shop-${index}.jpeg`,
        description: `Producto shop-${index}`,
        brand: "Original",
        inStock: inStockIds.includes(index.toString()),
    }
})

export const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: "watch" | "perfume"): Product[] => {
    return products.filter((product) => product.category === category)
}
