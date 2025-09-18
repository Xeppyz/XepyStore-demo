"use client"

import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem } from "@/components/CartItem"
// Update the path below to the correct relative path if your cart-context is in src/contexts
import { useCart } from "@/Contexts/CartContext"

interface CartProps {
    onBackClick: () => void
    onCheckoutClick: () => void
}

export function Cart({ onBackClick, onCheckoutClick }: CartProps) {
    const { items, getTotalPrice, clearCart } = useCart()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-NI", {
            style: "currency",
            currency: "NIO",
        }).format(price)
    }

    if (items.length === 0) {
        return (
            <div className="w-full mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
                <div className="flex items-center space-x-4 mb-8">
                    <Button variant="outline" onClick={onBackClick} size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a la Tienda
                    </Button>
                    <h1 className="text-3xl font-bold">Carrito de Compras</h1>
                </div>

                <Card className="text-center py-12">
                    <CardContent className="space-y-4">
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                        <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
                        <p className="text-muted-foreground">Añade algunos productos para comenzar tu compra</p>
                        <Button onClick={onBackClick} className="mt-4">
                            Explorar Productos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={onBackClick} size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a la Tienda
                    </Button>
                    <h1 className="text-3xl font-bold">Carrito de Compras</h1>
                </div>

                <Button
                    variant="outline"
                    onClick={clearCart}
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vaciar Carrito
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Resumen del Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {item.product.name} x{item.quantity}
                                        </span>
                                        <span>
                                            {item.paymentType === "installments" && item.monthlyPayment && item.installmentMonths
                                                ? formatPrice(item.monthlyPayment * item.installmentMonths * item.quantity)
                                                : formatPrice(item.product.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total:</span>
                                    <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Button onClick={onCheckoutClick} className="w-full" size="lg">
                                    Proceder al Checkout
                                </Button>
                                <Button variant="outline" onClick={onBackClick} className="w-full bg-transparent">
                                    Continuar Comprando
                                </Button>
                            </div>

                            <div className="text-xs text-muted-foreground text-center pt-4 space-y-1">
                                <p>✓ Envío gratuito en pedidos superiores a C$200</p>
                                <p>✓ Garantía de devolución de 30 días</p>
                                <p>✓ Pago seguro y protegido</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
