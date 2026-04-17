import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { createOrder, resetOrder } from '../store/orderSlice';
import type { RootState, AppDispatch } from '../store/store';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from '../context/ToastContext';

// Use dummy Stripe publishable key
const stripePromise = loadStripe('pk_test_51TN8CsF96TPv6SgRebYmulCPobK4krqoor4BOvzFkdmFMu7avjpSwSwjl9wTpSW03f6jyK5wstAAMuaZ8Kv9Iz3j00EbkxsXYk');

const StripeForm = ({ onPaymentSuccess, setGlobalLoading }: { onPaymentSuccess: (paymentIntentId: string) => void, setGlobalLoading: (loading: boolean) => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setGlobalLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-success`,
            },
            redirect: 'if_required',
        });

        if (error) {
            addToast(error.message || 'Payment failed', 'error');
            setGlobalLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            await onPaymentSuccess(paymentIntent.id);
        } else {
            setGlobalLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe}
                className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-6 disabled:opacity-50"
            >
                Submit Secure Payment
            </button>
        </form>
    );
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { addToast } = useToast();

    const { items, totalPrice } = useSelector((state: RootState) => state.cart);
    const { isSuccess, isError, message, isLoading, currentOrder } = useSelector((state: RootState) => state.order);
    const { token } = useSelector((state: RootState) => state.auth);

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod] = useState('Stripe');
    const [stripeClientSecret, setStripeClientSecret] = useState('');
    const [stripeLoading, setStripeLoading] = useState(false);

    // Redirect if no shipping address
    useEffect(() => {
        if (!location.state?.shippingAddress) {
            navigate('/checkout');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (isError) {
            addToast(message, 'error');
            dispatch(resetOrder());
        }

        // Logic fires when order is created in our backend
        if (isSuccess && currentOrder && !stripeClientSecret) {
            if (paymentMethod === 'Stripe') {
                createStripeIntent(currentOrder._id);
            } else {
                dispatch(clearCart());
                dispatch(resetOrder());
                navigate('/order-success');
            }
        }
    }, [isSuccess, isError, message, navigate, dispatch, paymentMethod, currentOrder, stripeClientSecret]);

    const createStripeIntent = async (orderId: string) => {
        setStripeLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/payment/stripe/intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ orderId })
            });
            const data = await res.json();
            if (res.ok) {
                setStripeClientSecret(data.clientSecret);
            } else {
                addToast(data.message || 'Error initializing Stripe', 'error');
            }
        } catch (error) {
            addToast('Failed to initialize connection to Stripe', 'error');
        } finally {
            setStripeLoading(false);
        }
    };

    const handleStripeSuccess = async (paymentIntentId: string) => {
        try {
            const res = await fetch('http://localhost:5000/api/payment/stripe/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    paymentIntentId,
                    orderId: currentOrder?._id
                })
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(clearCart());
                dispatch(resetOrder());
                navigate('/order-success');
            } else {
                addToast(data.message || 'Verification Failed', 'error');
            }
        } catch (error) {
            addToast('Error verifying payment on our end.', 'error');
        } finally {
            setStripeLoading(false);
        }
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent generating order if we already have it in state
        if (currentOrder && stripeClientSecret && paymentMethod === 'Stripe') return;

        const orderData = {
            orderItems: items.map((item: any) => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price,
                product: item._id || item.id,
            })),
            shippingAddress: location.state.shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: totalPrice,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: totalPrice,
        };

        dispatch(createOrder(orderData));
    };

    if (!location.state?.shippingAddress) return null;

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Payment</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                        {/* Hide original form if Stripe UI is active! */}
                        {!stripeClientSecret ? (
                            <>
                                <div className="mb-6">
                                    <p className="text-gray-600 mb-4">You will be securely paying via Stripe. Click the button below to initialize the exact total and load the secure payment form.</p>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isLoading || stripeLoading}
                                        className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        {(isLoading || stripeLoading) ? 'Initializing Secure Payment...' : `Proceed to Pay $${totalPrice.toFixed(2)}`}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="relative">
                                {/* Stripe Elements Form UI */}
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800">Complete Payment</h3>
                                    <p className="text-sm text-gray-500">Secured precisely by Stripe</p>
                                </div>
                                <Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret }}>
                                    <StripeForm
                                        onPaymentSuccess={handleStripeSuccess}
                                        setGlobalLoading={setStripeLoading}
                                    />
                                </Elements>
                                {stripeLoading && (
                                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                                        <span className="font-bold text-lg animate-pulse">Running verification...</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;