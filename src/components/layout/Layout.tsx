import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh flex flex-col">
            <main className="flex-1 w-full px-3 sm:px-4 md:px-6">
                {children}
            </main>
            <Footer />
        </div>
    )
}
