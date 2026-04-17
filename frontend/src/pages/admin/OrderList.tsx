import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { listAllOrders, resetOrder } from '../../store/orderSlice';

const OrderList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, isLoading, isError, message } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        dispatch(listAllOrders());
        return () => {
            dispatch(resetOrder());
        };
    }, [dispatch]);

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Orders</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p className="text-red-500">{message}</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-700">ID</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">USER</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">DATE</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">TOTAL</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">PAID</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">DELIVERED</th>
                                <th className="px-6 py-3 font-semibold text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order: any) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm">{order._id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4">{order.user && order.user.name}</td>
                                    <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                                    <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-semibold">{order.paidAt?.substring(0, 10) || 'Yes'}</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">No</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-semibold">{order.deliveredAt?.substring(0, 10) || 'Yes'}</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">No</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/order/${order._id}`} className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderList;
