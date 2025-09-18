export default function Footer() {
    return (
        <footer className="mt-10 border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-8 text-xs opacity-70">
                © {new Date().getFullYear()} Xepy Store — Todos los derechos reservados
            </div>
        </footer>
    )
}
