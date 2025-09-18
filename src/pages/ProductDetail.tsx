import { useParams, useNavigate } from 'react-router-dom'
import { ProductDetail as ProductDetailView } from '@/components/ProductDetail'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    if (!id) return null
    return (
        <ProductDetailView
            productId={id}
            onBackClick={() => navigate('/')}
            onCheckoutClick={() => navigate('/checkout')}
        />
    )
}
