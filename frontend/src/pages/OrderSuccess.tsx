import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const OrderSuccess = () => {
    // Ideally we'd get the order details from Redux state (currentOrder)
    const { currentOrder } = useSelector((state: RootState) => state.order);

    return (
        <div className="container mx-auto px-8 py-20 text-center">
            <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8">Your order has been placed successfully.</p>

            {currentOrder && (
                <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8 text-left">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <Link to={`/order/${currentOrder.id || currentOrder._id}`} className="font-mono font-bold mb-4 text-blue-600 hover:underline">
                        #{currentOrder.id || currentOrder._id}
                    </Link>

                    <p className="text-sm text-gray-500 mb-1">Expected Delivery</p>
                    <p className="font-medium mb-4">3-5 Business Days</p>

                    <p className="text-sm text-gray-500 mb-1">Shipping To</p>
                    <p className="font-medium">
                        {currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}<br />
                        {currentOrder.shippingAddress.address}<br />
                        {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.zip}
                    </p>
                </div>
            )}

            <div className="flex justify-center gap-4">
                <Link
                    to="/"
                    className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                >
                    Continue Shopping
                </Link>
                <Link
                    to="/profile"
                    className="border border-gray-300 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                    View Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;