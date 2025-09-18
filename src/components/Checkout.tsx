"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/Contexts/CartContext"

interface CheckoutProps {
    onBackClick: () => void
}

export function Checkout({ onBackClick }: CheckoutProps) {
    const { items, getTotalPrice, clearCart } = useCart()
    const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderNumber, setOrderNumber] = useState("")

    const [shippingData, setShippingData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Nicaragua",
    })

    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: "",
    })

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-NI", {
            style: "currency",
            currency: "NIO",
        }).format(price)
    }

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStep("payment")
    }

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Generate order number
        const orderNum = `LTS-${Date.now().toString().slice(-6)}`
        setOrderNumber(orderNum)
        setStep("confirmation")
        setIsProcessing(false)
        clearCart()
    }

    if (items.length === 0 && step !== "confirmation") {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">No hay productos en el carrito</h2>
                <Button onClick={onBackClick}>Volver a la Tienda</Button>
            </div>
        )
    }

    if (step === "confirmation") {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <Card>
                    <CardContent className="p-8 space-y-6">
                        <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-green-600">¡Pedido Confirmado!</h2>
                            <p className="text-muted-foreground">Tu pedido ha sido procesado exitosamente</p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Número de pedido</p>
                            <p className="text-xl font-bold">{orderNumber}</p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• Recibirás un email de confirmación en breve</p>
                            <p>• El envío se realizará en 2-3 días hábiles</p>
                            <p>• Podrás rastrear tu pedido con el número proporcionado</p>
                        </div>

                        <Button onClick={onBackClick} className="w-full">
                            Continuar Comprando
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
            <div className="flex items-center space-x-4 mb-8">
                <Button variant="outline" onClick={onBackClick} size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al Carrito
                </Button>
                <h1 className="text-3xl font-bold">Checkout</h1>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-8">
                <div
                    className={`flex items-center space-x-2 ${step === "shipping" ? "text-primary" : "text-muted-foreground"}`}
                >
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                        <Truck className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Envío</span>
                </div>

                <div className="w-12 h-px bg-border" />

                <div className={`flex items-center space-x-2 ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                        <CreditCard className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Pago</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {step === "shipping" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Información de Envío</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleShippingSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nombre *</Label>
                                            <Input
                                                id="firstName"
                                                required
                                                value={shippingData.firstName}
                                                onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Apellidos *</Label>
                                            <Input
                                                id="lastName"
                                                required
                                                value={shippingData.lastName}
                                                onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={shippingData.email}
                                            onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            value={shippingData.phone}
                                            onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Dirección *</Label>
                                        <Textarea
                                            id="address"
                                            required
                                            value={shippingData.address}
                                            onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">Ciudad *</Label>
                                            <Input
                                                id="city"
                                                required
                                                value={shippingData.city}
                                                onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode">Código Postal *</Label>
                                            <Input
                                                id="postalCode"
                                                required
                                                value={shippingData.postalCode}
                                                onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">País *</Label>
                                            <Select
                                                value={shippingData.country}
                                                onValueChange={(value) => setShippingData({ ...shippingData, country: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Nicaragua">Nicaragua</SelectItem>
                                                    <SelectItem value="Portugal">Portugal</SelectItem>
                                                    <SelectItem value="Francia">Francia</SelectItem>
                                                    <SelectItem value="Italia">Italia</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full" size="lg">
                                        Continuar al Pago
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {step === "payment" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Información de Pago</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardName">Nombre en la tarjeta *</Label>
                                        <Input
                                            id="cardName"
                                            required
                                            value={paymentData.cardName}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber">Número de tarjeta *</Label>
                                        <Input
                                            id="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            required
                                            value={paymentData.cardNumber}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiryDate">Fecha de vencimiento *</Label>
                                            <Input
                                                id="expiryDate"
                                                placeholder="MM/AA"
                                                required
                                                value={paymentData.expiryDate}
                                                onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv">CVV *</Label>
                                            <Input
                                                id="cvv"
                                                placeholder="123"
                                                required
                                                value={paymentData.cvv}
                                                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button type="button" variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                                            Volver
                                        </Button>
                                        <Button type="submit" className="flex-1" size="lg" disabled={isProcessing}>
                                            {isProcessing ? "Procesando..." : "Confirmar Pedido"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Resumen del Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-sm">
                                        <div className="space-y-1">
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-muted-foreground">
                                                Cantidad: {item.quantity}
                                                {item.paymentType === "installments" && (
                                                    <span className="block">
                                                        {item.installmentMonths} cuotas de {formatPrice(item.monthlyPayment || 0)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <span className="font-medium">
                                            {formatPrice(
                                                item.paymentType === "installments" && item.monthlyPayment && item.installmentMonths
                                                    ? item.monthlyPayment * item.installmentMonths * item.quantity
                                                    : item.product.price * item.quantity,
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{formatPrice(getTotalPrice())}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío:</span>
                                    <span className="text-green-600">Gratuito</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground space-y-1 pt-4">
                                <p>✓ Pago seguro con SSL</p>
                                <p>✓ Garantía de devolución</p>
                                <p>✓ Soporte 24/7</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
