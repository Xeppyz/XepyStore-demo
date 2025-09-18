"use client"

import { useState } from "react"
import { products } from "@/lib/Products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface ProductGridProps {
    onProductClick: (productId: string) => void
}

export function ProductGrid({ onProductClick }: ProductGridProps) {
    const [filter, setFilter] = useState<"all" | "watch" | "perfume">("all")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter((product) => {
        const matchesFilter = filter === "all" || product.category === filter
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Relojes y Perfumes de Lujo
                </h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                    Descubre nuestra exclusiva colección de relojes de prestigio y fragancias de alta gama. Calidad excepcional
                    con opciones de pago flexibles y envío gratuito.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:flex-1 lg:max-w-xl">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar productos, marcas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-background"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <div className="flex space-x-2">
                        <Button
                            variant={filter === "all" ? "default" : "outline"}
                            onClick={() => setFilter("all")}
                            className="rounded-full transition-all duration-200"
                            size="sm"
                        >
                            Todos ({products.length})
                        </Button>
                        <Button
                            variant={filter === "watch" ? "default" : "outline"}
                            onClick={() => setFilter("watch")}
                            className="rounded-full transition-all duration-200"
                            size="sm"
                        >
                            Relojes ({products.filter((p) => p.category === "watch").length})
                        </Button>
                        <Button
                            variant={filter === "perfume" ? "default" : "outline"}
                            onClick={() => setFilter("perfume")}
                            className="rounded-full transition-all duration-200"
                            size="sm"
                        >
                            Perfumes ({products.filter((p) => p.category === "perfume").length})
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            {(searchTerm || filter !== "all") && (
                <div className="text-sm text-muted-foreground">
                    {filteredProducts.length === 0
                        ? "No se encontraron productos"
                        : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""} encontrado${filteredProducts.length !== 1 ? "s" : ""}`}
                    {searchTerm && ` para "${searchTerm}"`}
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">No se encontraron productos</h3>
                        <p className="text-muted-foreground">
                            Intenta con otros términos de búsqueda o explora todas las categorías
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            setSearchTerm("")
                            setFilter("all")
                        }}
                        variant="outline"
                    >
                        Ver Todos los Productos
                    </Button>
                </div>
            )}
        </div>
    )
}
