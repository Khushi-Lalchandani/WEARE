import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../store/cartSlice';

const Cart = () => {
    const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/cart' } } });
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className="container mx-auto p-8 min-h-screen">
            <h2 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h2>

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <p className="text-gray-500 text-xl mb-6">Your cart is empty</p>
                    <a href="/" className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Continue Shopping
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div key={item.cartId} className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                />

                                <div className="flex-1 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-gray-600 text-sm">{item.category}</p>
                                    {item.size && (
                                        <p className="text-gray-600 text-sm font-medium mt-1">Size: {item.size}</p>
                                    )}
                                    <p className="text-gray-800 font-semibold mt-1">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => dispatch(decrementQuantity(item.cartId))}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(incrementQuantity(item.cartId))}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.cartId))}
                                        className="text-red-500 hover:text-red-700 text-sm mt-2 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-8">
                            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3"
                            >
                                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                            </button>

                            <button
                                onClick={() => dispatch(clearCart())}
                                className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Clear Cart
                            </button>

                            <a href="/" className="block text-center mt-4 text-gray-600 hover:text-black transition-colors">
                                ← Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
