import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishListSlice';
import { fetchProducts, fetchProductById } from '../services/api';
import type { Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import SizeBox from '../components/SizeBox';
import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [pincode, setPincode] = useState('');
    const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const sizes = [{ size: 'S', available: true }, { size: 'M', available: false }, { size: 'L', available: true }, { size: 'XL', available: true }, { size: 'XXL', available: true }];


    const checkDelivery = () => {
        if (pincode.length === 6) {
            const date = new Date();
            date.setDate(date.getDate() + 3);
            setDeliveryEstimate(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProductData = async () => {
            if (!id) return;
            try {
                const productData = await fetchProductById(id);
                setProduct(productData);
                setSelectedImage(productData.image);
                setActiveImgIndex(0);
                setSelectedSize(null);

                // Fetch related products
                const relatedData = await fetchProducts(undefined, productData.category);
                // Filter out current product and take first 4
                setRelatedProducts(relatedData.filter((p: Product) => p.id !== productData.id).slice(0, 4));

            } catch (error) {
                console.error("Failed to fetch product details", error);
                setProduct(null);
            }
        };
        loadProductData();
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            addToast('Please select a size before adding to the cart!', 'error');
            return;
        }

        if (product) {
            // Add multiple times based on quantity
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart({ ...product, size: selectedSize }));
            }
            addToast('Added to cart!', 'success');
        }
    };

    const handleAddToWishlist = () => {
        if (product) {
            dispatch(addToWishlist(product));
            addToast('Added to wishlist!', 'success');
        }
    };

    if (!product) {
        return (
            <div className="container mx-auto px-8 py-20 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-8 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8">
                <Link to="/" className="hover:text-black">Home</Link> /
                <span className="mx-2">{product.category}</span> /
                <span className="text-black font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible scrollbar-hide no-scrollbar">
                        {[0, 1, 2, 3].map((i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setSelectedImage(product.image);
                                    setActiveImgIndex(i);
                                }}
                                className={`w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${activeImgIndex === i ? 'border-black' : 'border-transparent'
                                    }`}
                            >
                                <img
                                    src={product.image}
                                    alt={`View ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden aspect-square relative">
                        <img
                            src={selectedImage || product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <div className="mb-2">
                        {product.badge && (
                            <span className="bg-black text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider">
                                {product.badge}
                            </span>
                        )}
                        <h1 className="text-4xl font-bold mt-2 mb-2">{product.name}</h1>
                        <p className="text-2xl font-medium mb-4">${product.price.toFixed(2)}</p>

                        {/* Offers */}
                        {/* Offers */}
                        {product.offers && product.offers.length > 0 && (
                            <div className="mb-6">
                                <h3 className="flex items-center gap-2 font-bold text-sm mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 13.517v-5.017l10.95 5.517l-10.95 5.517v-5.017" /></svg>
                                    Best Offers
                                </h3>
                                <div className="space-y-2">
                                    {product.offers.map((offer, index) => (
                                        <div key={index} className="bg-gray-50 border border-gray-200 rounded p-3 text-sm">
                                            <p className="font-medium text-green-700 mb-1">Coupon: {offer.code}</p>
                                            <p className="text-gray-600">{offer.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold">Select Size</span>
                                <button className="text-sm text-pink-600 font-bold uppercase tracking-wide">Size Chart</button>
                            </div>
                            <div className="flex flex-wrap">
                                {sizes.map(({ size, available }) => (
                                    <SizeBox
                                        key={size}
                                        size={size}
                                        selected={selectedSize === size}
                                        onClick={(val) => setSelectedSize(val)}
                                        disabled={!available}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Elevate your style with the {product.name}. Crafted with precision and attention to detail,
                        this piece from our {product.category} collection offers both comfort and sophistication.
                        Perfect for any occasion, it features high-quality materials ensuring durability and a premium feel.
                    </p>

                    <div className="border-t border-b border-gray-200 py-6 mb-8">
                        <div className="flex items-center gap-6 mb-6">
                            <span className="font-semibold">Quantity</span>
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 font-medium">{quantity}</span>
                                <button
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-4 px-6 rounded-lg font-bold hover:bg-gray-800 transition-all transform active:scale-95"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleAddToWishlist}
                                className="w-14 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                aria-label="Add to Wishlist"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        {/* Delivery Checker */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                Check Delivery
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0 -6 0"></path><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path></svg>
                            </h3>
                            <div className="flex gap-3 mb-2">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    maxLength={6}
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none w-40"
                                />
                                <button
                                    onClick={checkDelivery}
                                    className="text-sm font-bold text-pink-600"
                                >
                                    Check
                                </button>
                            </div>
                            {deliveryEstimate && (
                                <p className="text-sm text-gray-600">
                                    Get it by <span className="font-bold text-black">{deliveryEstimate}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Specifications */}
                    {/* Specifications */}
                    {product.details && (
                        <div className="border-t border-gray-200 py-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                Product Details
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><path d="M9 9l1 0"></path><path d="M9 13l6 0"></path><path d="M9 17l6 0"></path></svg>
                            </h3>
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                {product.details.material && (
                                    <div>
                                        <h4 className="text-gray-500 mb-1">Material</h4>
                                        <p className="font-medium">{product.details.material}</p>
                                    </div>
                                )}
                                {product.details.care && (
                                    <div>
                                        <h4 className="text-gray-500 mb-1">Care</h4>
                                        <p className="font-medium">{product.details.care}</p>
                                    </div>
                                )}
                                {product.details.fit && (
                                    <div>
                                        <h4 className="text-gray-500 mb-1">Fit</h4>
                                        <p className="font-medium">{product.details.fit}</p>
                                    </div>
                                )}
                                {product.details.sustainable && (
                                    <div>
                                        <h4 className="text-gray-500 mb-1">Sustainable</h4>
                                        <p className="font-medium">{product.details.sustainable}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="text-sm text-gray-500 space-y-2">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                            <span>Free shipping on orders over $100</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                            </svg>
                            <span>30 days return policy</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(related => (
                            <ProductCard key={related.id} product={related} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
