
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { ProductGrid } from '@/components/ProductGrid'
import { Cart } from '@/components/Cart'
import { ProductDetail as ProductDetailView } from '@/components/ProductDetail'
import { Checkout } from '@/components/Checkout'

export default function Home() {
    const [currentView, setCurrentView] = useState<'home' | 'cart' | 'product' | 'checkout'>('home')
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    const handleViewProduct = (productId: string) => {
        setSelectedProductId(productId)
        setCurrentView('product')
    }

    const handleBackToHome = () => {
        setCurrentView('home')
        setSelectedProductId(null)
    }

    return (
        <div className="min-h-dvh">
            <Navbar onCartClick={() => setCurrentView('cart')} onHomeClick={handleBackToHome} />
            <main className="w-full mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8">
                {currentView === 'home' && (
                    <>
                        <ProductGrid onProductClick={handleViewProduct} />
                    </>
                )}
                {currentView === 'cart' && (
                    <Cart onBackClick={handleBackToHome} onCheckoutClick={() => setCurrentView('checkout')} />
                )}
                {currentView === 'product' && selectedProductId && (
                    <ProductDetailView
                        productId={selectedProductId}
                        onBackClick={handleBackToHome}
                        onCheckoutClick={() => setCurrentView('checkout')}
                    />
                )}
                {currentView === 'checkout' && <Checkout onBackClick={() => setCurrentView('cart')} />}
            </main>
        </div>
    )
}
