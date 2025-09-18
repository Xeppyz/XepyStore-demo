"use client"

import { useState } from "react"
// using native img in Vite React instead of next/image
import { Minus, Plus, Trash2, CreditCard, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart, type CartItem as CartItemType } from "@/Contexts/CartContext"

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart()
    const [isUpdating, setIsUpdating] = useState(false)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-NI", {
            style: "currency",
            currency: "NIO",
        }).format(price)
    }

    const handleQuantityChange = async (newQuantity: number) => {
        setIsUpdating(true)
        await new Promise((resolve) => setTimeout(resolve, 200))
        updateQuantity(item.product.id, newQuantity)
        setIsUpdating(false)
    }

    const getItemTotal = () => {
        if (item.paymentType === "installments" && item.monthlyPayment && item.installmentMonths) {
            return item.monthlyPayment * item.installmentMonths * item.quantity
        }
        return item.product.price * item.quantity
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground font-medium">{item.product.brand}</p>
                                <h3 className="font-semibold text-lg leading-tight">{item.product.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                    {item.product.category === "watch" ? "Reloj" : "Perfume"}
                                </Badge>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Payment Type */}
                        <div className="flex items-center space-x-2">
                            {item.paymentType === "cash" ? (
                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                    <Banknote className="h-4 w-4" />
                                    <span>Pago al contado</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                    <CreditCard className="h-4 w-4" />
                                    <span>
                                        {item.installmentMonths} cuotas de {formatPrice(item.monthlyPayment || 0)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.quantity - 1)}
                                    disabled={isUpdating || item.quantity <= 1}
                                    className="h-8 w-8 p-0"
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>

                                <span className="w-12 text-center font-medium">{item.quantity}</span>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.quantity + 1)}
                                    disabled={isUpdating}
                                    className="h-8 w-8 p-0"
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-semibold text-primary">{formatPrice(getItemTotal())}</p>
                                {item.quantity > 1 && (
                                    <p className="text-sm text-muted-foreground">
                                        {formatPrice(
                                            item.paymentType === "installments" && item.monthlyPayment && item.installmentMonths
                                                ? item.monthlyPayment * item.installmentMonths
                                                : item.product.price,
                                        )}{" "}
                                        c/u
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
