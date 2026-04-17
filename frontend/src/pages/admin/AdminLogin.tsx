import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { loginStart, loginSuccess, loginFailure, clearError, logout } from '../../store/authSlice';
import * as authService from '../../services/authService';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // If they hit this page and are ALREADY logged in as Admin, send them directly to dashboard
        if (isAuthenticated && user?.isAdmin) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const { user: loggedInUser, token } = await authService.login(email, password);
            
            // STRICT AUTHENTICATION GATE
            if (loggedInUser.isAdmin) {
                dispatch(loginSuccess({ user: loggedInUser, token }));
                navigate('/admin/dashboard', { replace: true });
            } else {
                // Instantly revoke tokens if a normal customer tries to use the admin portal
                authService.logout();
                dispatch(logout());
                dispatch(loginFailure('Unauthorized Access: Administrator Privileges Required.'));
            }
        } catch (err: any) {
            dispatch(loginFailure(err.message || 'Invalid Credentials'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
                <div>
                    <div className="mx-auto h-12 w-12 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Restricted System Access
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Admin Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-700/50 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                placeholder="sysadmin@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Master Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-700/50 placeholder-gray-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-600/30"
                    >
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                    
                    <div className="text-center mt-6">
                        <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                            ← Return to Storefront
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
