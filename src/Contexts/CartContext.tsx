"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/lib/Products"

export interface CartItem {
    product: Product
    quantity: number
    paymentType: "cash" | "installments"
    installmentMonths?: number
    monthlyPayment?: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, paymentType: "cash" | "installments", installmentMonths?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const addToCart = (product: Product, paymentType: "cash" | "installments", installmentMonths?: number) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id)

            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                )
            }

            let monthlyPayment = undefined
            if (paymentType === "installments" && installmentMonths) {
                const interestRate = getInterestRate(installmentMonths)
                const totalWithInterest = product.price * (1 + interestRate / 100)
                monthlyPayment = totalWithInterest / installmentMonths
            }

            return [
                ...prevItems,
                {
                    product,
                    quantity: 1,
                    paymentType,
                    installmentMonths,
                    monthlyPayment,
                },
            ]
        })
    }

    const removeFromCart = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    }

    const clearCart = () => {
        setItems([])
    }

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            if (item.paymentType === "installments" && item.monthlyPayment && item.installmentMonths) {
                return total + item.monthlyPayment * item.installmentMonths * item.quantity
            }
            return total + item.product.price * item.quantity
        }, 0)
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

// Interest rates based on installment months
// eslint-disable-next-line react-refresh/only-export-components
export function getInterestRate(months: number): number {
    if (months <= 3) return 0
    if (months <= 6) return 12
    if (months <= 12) return 18
    return 24
}
