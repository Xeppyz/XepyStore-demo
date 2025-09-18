"use client"

import { ShoppingCart, Watch, Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/Contexts/CartContext"

interface NavbarProps {
    onCartClick: () => void
    onHomeClick: () => void
}

export function Navbar({ onCartClick, onHomeClick }: NavbarProps) {
    const { getTotalItems } = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const totalItems = getTotalItems()

    return (
        <nav className="border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/70 sticky top-0 z-50">
            <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={onHomeClick}
                        className="flex items-center space-x-2 text-xl font-bold text-foreground hover:text-primary transition-colors group"
                    >
                        <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform">
                            <Watch className="h-6 w-6 text-primary" />
                            <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
                        </div>
                        <span className="hidden sm:block">XepyStore</span>
                        <span className="sm:hidden">LTS</span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={onHomeClick}
                            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                        >
                            Productos
                        </button>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-sm text-muted-foreground">Envío gratuito +C$200</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-sm text-muted-foreground">Hasta 24 cuotas</span>
                    </div>

                    {/* Cart Button */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={onCartClick}
                            className="relative bg-transparent hover:bg-accent transition-all duration-200"
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Carrito</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-border space-y-3">
                        <button
                            onClick={() => {
                                onHomeClick()
                                setIsMobileMenuOpen(false)
                            }}
                            className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                        >
                            Productos
                        </button>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p>✓ Envío gratuito en pedidos +C$200</p>
                            <p>✓ Pago hasta en 24 cuotas sin interés</p>
                            <p>✓ Garantía de devolución 30 días</p>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
