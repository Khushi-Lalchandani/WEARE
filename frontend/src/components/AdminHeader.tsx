import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import * as authService from '../services/authService';
import type { RootState } from '../store/store';

const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        authService.logout();
        dispatch(logout());
        navigate('/admin');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Branding & Core Nav */}
                    <div className="flex items-center gap-8">
                        <Link to="/admin/dashboard" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:bg-pink-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-gray-900">SYS<span className="text-pink-600">ADMIN</span></span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link 
                                to="/admin/dashboard" 
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/admin/dashboard') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/admin/orders" 
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/admin/orders') ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                Orders
                            </Link>
                            <Link 
                                to="/admin/products" 
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/admin/products') ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                Inventory
                            </Link>
                            <Link 
                                to="/admin/users" 
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive('/admin/users') ? 'bg-purple-50 text-purple-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                Users
                            </Link>
                        </nav>
                    </div>

                    {/* Right: Auth Tools */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right mr-2">
                            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Administrator</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                            aria-label="Logout"
                            title="Logout from Admin Portal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
