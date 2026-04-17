import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetOrder } from '../store/orderSlice';
import type { RootState, AppDispatch } from '../store/store';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { items, totalPrice } = useSelector((state: RootState) => state.cart);

    // Reset any leftover success state from previous orders
    useEffect(() => {
        dispatch(resetOrder());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to payment with shipping address data
        navigate('/payment', { state: { shippingAddress: formData } });
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-8 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-black text-white px-6 py-3 rounded-lg"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Shipping Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    id="postalCode"
                                    type="text"
                                    name="postalCode"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.cartId} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{item.name}</h4>
                                    {item.size && (
                                        <p className="text-gray-500 text-xs font-medium">Size: {item.size}</p>
                                    )}
                                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;