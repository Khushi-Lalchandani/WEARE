import { useState } from 'react';
import type { Product } from '../data/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishListSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToCart({ ...product, size: 'S' }));
        addToast('Added Size S to cart!', 'success');
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToWishlist(product));
        addToast('Added to wishlist!', 'success');
    }

    return (
        <div
            className={`relative group cursor-pointer transition-all duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/product/${product.id}`)}
        >
            {/* Badge */}
            {product.badge && (
                <span className={`absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full z-10`}>
                    {product.badge}
                </span>
            )}

            {/* Product Image */}
            <div className={`relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-lg`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'
                        }`}
                />

                {/* Wishlist Icon */}
                <button
                    className={`absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={(e) => handleAddToWishlist(e)}
                    aria-label="Add to wishlist"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* Add to Cart Button */}
                <button
                    onClick={(e) => handleAddToCart(e)}
                    className={`absolute bottom-0 left-0 right-0 bg-black text-white py-3 font-semibold transition-all duration-300 hover:bg-gray-800 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                >
                    Add to Cart
                </button>
            </div>

            {/* Product Info */}
            <div className={`mt-4`}>
                <p className={`text-sm text-gray-600 mb-1`}>{product.category}</p>
                <h3 className={`font-semibold text-lg mb-2`}>{product.name}</h3>
                <p className={`text-lg font-bold`}>${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
