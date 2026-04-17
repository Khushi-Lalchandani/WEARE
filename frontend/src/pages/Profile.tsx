import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { listMyOrders } from '../store/orderSlice';
import { updateProfile } from '../store/adminUserSlice';

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const { user } = useSelector((state: RootState) => state.auth);
    const { orders, isLoading, isError, message } = useSelector((state: RootState) => state.order);
    const { success: profileUpdateSuccess, error: profileUpdateError, loading: profileUpdateLoading } = useSelector((state: RootState) => state.adminUser);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setEmail(user.email);
            dispatch(listMyOrders());
        }
    }, [user, navigate, dispatch]);

    useEffect(() => {
        if (profileUpdateSuccess) {
            setUpdateSuccess(true);
            setUpdateMessage('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => setUpdateSuccess(false), 3000);
        }
    }, [profileUpdateSuccess]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateMessage(null);

        if (password !== confirmPassword) {
            setUpdateMessage('Passwords do not match');
            return;
        }

        dispatch(updateProfile({ name, email, password }));
    };

    if (!user) return null;

    return (
        <div className="container mx-auto px-8 py-12">
            <div className="mb-8">
                <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-black transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Store
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold uppercase">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                            >
                                Profile Settings
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                            >
                                Order History
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-3/4">
                    {activeTab === 'profile' && (
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

                            {(updateMessage || profileUpdateError) && (
                                <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${updateSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {updateMessage || profileUpdateError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={profileUpdateLoading}
                                        className="bg-black text-white px-8 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-semibold"
                                    >
                                        {profileUpdateLoading ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6">Order History</h2>
                            {isLoading ? (
                                <p>Loading orders...</p>
                            ) : isError ? (
                                <p className="text-red-500">{message}</p>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No orders found</p>
                                    <Link to="/" className="text-black underline">Start Shopping</Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="pb-4 font-semibold">Order ID</th>
                                                <th className="pb-4 font-semibold">Date</th>
                                                <th className="pb-4 font-semibold">Total</th>
                                                <th className="pb-4 font-semibold">Paid</th>
                                                <th className="pb-4 font-semibold">Delivered</th>
                                                <th className="pb-4 font-semibold">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {orders.map((order: any) => (
                                                <tr key={order._id}>
                                                    <td className="py-4 font-mono text-sm">#{order._id?.substring(0, 10)}...</td>
                                                    <td className="py-4">{order.createdAt?.substring(0, 10)}</td>
                                                    <td className="py-4">${order.totalPrice.toFixed(2)}</td>
                                                    <td className="py-4">
                                                        {order.isPaid ? (
                                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Paid</span>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Unpaid</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4">
                                                        {order.isDelivered ? (
                                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Delivered</span>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Processing</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4">
                                                        <Link
                                                            to={`/order/${order._id}`}
                                                            className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50"
                                                        >
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
