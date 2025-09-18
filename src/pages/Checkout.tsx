import { useNavigate } from 'react-router-dom'
import { Checkout as CheckoutView } from '@/components/Checkout'

export default function Checkout() {
    const navigate = useNavigate()
    return (
        <CheckoutView onBackClick={() => navigate('/cart')} />
    )
}
