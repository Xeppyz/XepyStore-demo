"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingCart, CreditCard, Banknote, Star, Shield, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InstallmentCalculator } from "@/components/InstallCalculaterPropt"
import { useCart } from "@/Contexts/CartContext"
import { getProductById } from "@/lib/Products"

interface ProductDetailProps {
    productId: string
    onBackClick: () => void
    onCheckoutClick: () => void
}

export function ProductDetail({ productId, onBackClick, onCheckoutClick }: ProductDetailProps) {
    const product = getProductById(productId)
    const { addToCart } = useCart()
    const [paymentType, setPaymentType] = useState<"cash" | "installments">("cash")
    const [installmentMonths, setInstallmentMonths] = useState(3)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    if (!product) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
                <Button onClick={onBackClick}>Volver a la Tienda</Button>
            </div>
        )
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-NI", {
            style: "currency",
            currency: "NIO",
        }).format(price)
    }

    const handleAddToCart = async () => {
        setIsAddingToCart(true)
        await new Promise((resolve) => setTimeout(resolve, 500))

        addToCart(product, paymentType, paymentType === "installments" ? installmentMonths : undefined)
        setIsAddingToCart(false)
    }

    const handleBuyNow = async () => {
        await handleAddToCart()
        onCheckoutClick()
    }

    return (
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6">
            <div className="flex items-center space-x-4 mb-8">
                <Button variant="outline" onClick={onBackClick} size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a la Tienda
                </Button>
                <Badge variant="outline">{product.category === "watch" ? "Reloj" : "Perfume"}</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={1200}
                            height={1200}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Shield className="h-4 w-4" />
                            <span>Garantía oficial</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Truck className="h-4 w-4" />
                            <span>Envío gratuito</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <RotateCcw className="h-4 w-4" />
                            <span>30 días devolución</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <Star className="h-4 w-4" />
                            <span>Producto auténtico</span>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-lg text-muted-foreground font-medium">{product.brand}</p>
                        <h1 className="text-3xl font-bold text-balance">{product.name}</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                            {product.inStock ? (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                    En Stock
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-red-600 border-red-600">
                                    Agotado
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Descripción</h3>
                        <p className="text-muted-foreground text-pretty leading-relaxed">{product.description}</p>
                    </div>

                    {/* Payment Options */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Opciones de Pago</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        id="cash"
                                        name="payment"
                                        checked={paymentType === "cash"}
                                        onChange={() => setPaymentType("cash")}
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer">
                                        <Banknote className="h-4 w-4" />
                                        <span>Pago al contado - {formatPrice(product.price)}</span>
                                    </label>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        id="installments"
                                        name="payment"
                                        checked={paymentType === "installments"}
                                        onChange={() => setPaymentType("installments")}
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="installments" className="flex items-center space-x-2 cursor-pointer">
                                        <CreditCard className="h-4 w-4" />
                                        <span>Pago en cuotas</span>
                                    </label>
                                </div>
                            </div>

                            {paymentType === "installments" && (
                                <InstallmentCalculator
                                    price={product.price}
                                    selectedMonths={installmentMonths}
                                    onMonthsChange={setInstallmentMonths}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button onClick={handleBuyNow} size="lg" className="w-full" disabled={!product.inStock || isAddingToCart}>
                            {isAddingToCart ? "Procesando..." : "Comprar Ahora"}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleAddToCart}
                            size="lg"
                            className="w-full bg-transparent"
                            disabled={!product.inStock || isAddingToCart}
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {isAddingToCart ? "Añadiendo..." : "Añadir al Carrito"}
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t">
                        <p>• Envío gratuito en pedidos superiores a C$200</p>
                        <p>• Garantía de devolución de 30 días</p>
                        <p>• Pago seguro con SSL</p>
                        <p>• Atención al cliente 24/7</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
