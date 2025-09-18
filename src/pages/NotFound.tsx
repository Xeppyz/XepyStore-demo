import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-semibold mb-4">404</h1>
            <p className="mb-6">Página no encontrada.</p>
            <Link to="/" className="text-blue-500 hover:underline">Volver al inicio</Link>
        </div>
    )
}
