import { useNavigate } from 'react-router-dom'
import { Cart as CartView } from '@/components/Cart'

export default function Cart() {
    const navigate = useNavigate()
    return (
        <CartView
            onBackClick={() => navigate('/')}
            onCheckoutClick={() => navigate('/checkout')}
        />
    )
}
