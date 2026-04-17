import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { listAllOrders } from '../../store/orderSlice';
import { listAllProducts } from '../../store/productSlice';
import { listUsers } from '../../store/adminUserSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { orders } = useSelector((state: RootState) => state.order);
    const { products } = useSelector((state: RootState) => state.product);
    const { users } = useSelector((state: RootState) => state.adminUser);

    useEffect(() => {
        dispatch(listAllOrders());
        dispatch(listAllProducts());
        dispatch(listUsers());
    }, [dispatch]);

    const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.isPaid ? order.totalPrice : 0), 0);

    return (
        <div className="container mx-auto px-8 py-12 text-gray-900">
            <h1 className="text-4xl font-bold mb-10 tracking-tight">Admin Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Total Revenue</p>
                    <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Total Orders</p>
                    <h3 className="text-2xl font-bold">{orders.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Total Products</p>
                    <h3 className="text-2xl font-bold">{products.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Total Users</p>
                    <h3 className="text-2xl font-bold">{users.length}</h3>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-6 text-gray-700">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link to="/admin/orders" className="group">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-blue-100 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Manage</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Orders</h2>
                        <p className="text-gray-500 leading-relaxed text-sm">Review transactions, track shipping, and manage customer order fulfillment.</p>
                    </div>
                </Link>

                <Link to="/admin/products" className="group">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-green-100 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Inventory</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Products</h2>
                        <p className="text-gray-500 leading-relaxed text-sm">Add new inventory, update pricing, and maintain your store catalog.</p>
                    </div>
                </Link>

                <Link to="/admin/users" className="group">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-purple-100 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Access</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Users</h2>
                        <p className="text-gray-500 leading-relaxed text-sm">Manage user permissions, view member profiles, and control administrative access.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
