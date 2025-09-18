"use client"

import type React from "react"

import { useState } from "react"
// using native img in Vite React instead of next/image
import { ShoppingCart, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/Contexts/CartContext"
import type { Product } from "@/lib/Products"

interface ProductCardProps {
    product: Product
    onProductClick: (productId: string) => void
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
    const { addToCart } = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLoading(true)

        // Simulate loading for better UX
        await new Promise((resolve) => setTimeout(resolve, 300))

        addToCart(product, "cash")
        setIsLoading(false)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-NI", {
            style: "currency",
            currency: "NIO",
        }).format(price)
    }

    return (
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-card border-border card-hover overflow-hidden">
            <div className="relative overflow-hidden rounded-t-lg">
                {/* Image Loading Skeleton */}
                {!imageLoaded && (
                    <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-muted animate-pulse flex items-center justify-center">
                        <div className="w-16 h-16 bg-muted-foreground/20 rounded-full animate-pulse-slow" />
                    </div>
                )}

                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={800}
                    height={600}
                    className={`w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                        }`}
                    onClick={() => onProductClick(product.id)}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Category Badge */}
                <Badge variant="secondary" className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm shadow-sm">
                    {product.category === "watch" ? "Reloj" : "Perfume"}
                </Badge>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background"
                        onClick={(e) => {
                            e.stopPropagation()
                            onProductClick(product.id)
                        }}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="secondary"
                        className={`bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background transition-colors ${isLiked ? "text-red-500" : ""
                            }`}
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsLiked(!isLiked)
                        }}
                    >
                        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                </div>

                {/* Stock Indicator */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <Badge variant="outline" className="text-red-600 border-red-600 bg-background">
                            Agotado
                        </Badge>
                    </div>
                )}
            </div>

            <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
                    <h3 className="font-semibold text-lg leading-tight text-balance hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 text-pretty leading-relaxed">{product.description}</p>

                <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                        <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                        <p className="text-xs text-muted-foreground">o desde {formatPrice(product.price / 12)}/mes</p>
                    </div>
                    {product.inStock && (
                        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 dark:bg-green-950">
                            En Stock
                        </Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 space-y-2">
                <div className="flex space-x-2 w-full">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent hover:bg-accent transition-all duration-200"
                        onClick={() => onProductClick(product.id)}
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                    </Button>

                    <Button
                        size="sm"
                        className={`flex-1 transition-all duration-200 ${isLoading ? "btn-loading" : ""}`}
                        onClick={handleAddToCart}
                        disabled={!product.inStock || isLoading}
                    >
                        {!isLoading && <ShoppingCart className="h-4 w-4 mr-2" />}
                        {isLoading ? "Añadiendo..." : "Añadir"}
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">Pago al contado o hasta 24 cuotas • Envío gratuito</p>
            </CardFooter>
        </Card>
    )
}
