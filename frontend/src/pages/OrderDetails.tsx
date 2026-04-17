import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { getOrderDetails, payOrder, deliverOrder, resetOrder } from '../store/orderSlice';

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useSelector((state: RootState) => state.auth);
    const { currentOrder: order, isLoading: loading, isError: error, message, isSuccess } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id));
        }

        if (isSuccess) {
            dispatch(resetOrder());
            dispatch(getOrderDetails(id!));
        }
    }, [id, dispatch, isSuccess]);

    const deliverHandler = () => {
        if (id) {
            dispatch(deliverOrder(id));
        }
    };

    const payHandler = () => {
        // In a real app, this would be handled by a payment gateway component.
        // Here we simulate a successful payment result.
        if (id) {
            const paymentResult = {
                id: 'SIMULATED_ID_' + Date.now(),
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: user?.email,
            };
            dispatch(payOrder({ orderId: id, paymentResult }));
        }
    };

    if (loading) return <div className="p-8 text-center text-lg font-medium text-gray-500">Loading Order Details...</div>;
    if (error) return <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg mx-8 my-12 border border-red-100">Error: {message}</div>;
    if (!order) return <div className="p-8 text-center text-gray-500">Order not found</div>;

    return (
        <div className="container mx-auto px-8 py-12 text-gray-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <Link to={user?.isAdmin ? "/admin/orders" : "/profile"} className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest mb-2 block">
                        ← Back to {user?.isAdmin ? "Admin Orders" : "My Orders"}
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Order <span className="font-mono text-gray-400 text-2xl">#{order._id?.substring(0, 8)}...</span></h1>
                </div>
                <div className="flex gap-3">
                    {user?.isAdmin && !order.isPaid && (
                        <button
                            onClick={payHandler}
                            className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
                        >
                            Mark As Paid
                        </button>
                    )}
                    {user?.isAdmin && order.isPaid && !order.isDelivered && (
                        <button
                            onClick={deliverHandler}
                            className="bg-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                        >
                            Mark As Delivered
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Section */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v7h3.05a2.5 2.5 0 014.9 0H18a1 1 0 001-1V7a1 1 0 00-1-1h-3z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold">Shipping Information</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm leading-relaxed">
                            <div>
                                <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">Customer</p>
                                <p className="font-semibold text-gray-700">{order.user.name}</p>
                                <a href={`mailto:${order.user.email}`} className="text-blue-500 hover:underline">{order.user.email}</a>
                            </div>
                            <div>
                                <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">Address</p>
                                <p className="font-medium text-gray-600">
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                    {order.shippingAddress.country}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-50">
                            {order.isDelivered ? (
                                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                </div>
                            ) : (
                                <div className="bg-amber-50 text-amber-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                                    In Transit / Processing
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold">Payment Status</h2>
                        </div>
                        <p className="text-gray-600 mb-6 font-medium">
                            Method: <span className="text-black font-bold uppercase tracking-wide ml-1">{order.paymentMethod}</span>
                        </p>
                        <div className="pt-2">
                            {order.isPaid ? (
                                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                                </div>
                            ) : (
                                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    Awaiting Payment
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold mb-8">Items In Order</h2>
                        {order.orderItems.length === 0 ? <p className="text-gray-500 italic">No items found in this order.</p> : (
                            <div className="divide-y divide-gray-50">
                                {order.orderItems.map((item: any, index: number) => (
                                    <div key={index} className="py-6 first:pt-0 last:pb-0 flex items-center gap-6">
                                        <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-2xl overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product}`}>
                                                <h4 className="font-bold hover:text-gray-600 text-lg transition-colors">{item.name}</h4>
                                            </Link>
                                            <p className="text-sm text-gray-400 mt-1 uppercase font-bold tracking-widest">{item.qty} Unit{item.qty > 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${(item.qty * item.price).toFixed(2)}</p>
                                            <p className="text-xs text-gray-400 font-medium">${item.price} each</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Column */}
                <div className="lg:col-span-1">
                    <div className="bg-black text-white p-8 rounded-[2.5rem] sticky top-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-8">Summary</h2>
                        <div className="space-y-4 mb-8 text-gray-300">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-bold text-white">${order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium">Shipping Fee</span>
                                <span className="font-bold text-white">${order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium">Calculated Tax</span>
                                <span className="font-bold text-white">${order.taxPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                                <span className="text-3xl font-black">${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
