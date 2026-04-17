import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import { logout } from '../store/authSlice'
import * as authService from '../services/authService'

interface HeaderProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const Header = ({ selectedCategory, onCategoryChange }: HeaderProps) => {
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showUserMenu, setShowUserMenu] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const userMenuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Get state from Redux
    const cartCount = useSelector((state: RootState) => state.cart.totalItems)
    const wishlistCount = useSelector((state: RootState) => state.wishList.items.length)
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

    // Handle click outside to close search and user menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchInput(false)
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Auto-focus input when it appears
    useEffect(() => {
        if (showSearchInput && inputRef.current) {
            inputRef.current.focus()
        }
    }, [showSearchInput])

    const handleLogout = () => {
        authService.logout()
        dispatch(logout())
        setShowUserMenu(false)
        navigate('/')
    }

    const getUserInitials = () => {
        if (!user?.name) return 'U'
        return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const handleProfileClick = () => {
        if (isAuthenticated) {
            setShowUserMenu(!showUserMenu)
        } else {
            navigate('/login')
        }
    }

    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="relative">
            <div className={`flex items-center justify-between px-8 py-6 relative z-10`}>
                <div ref={searchRef} className={`flex items-center`}>
                    {!showSearchInput && (
                        <button
                            onClick={() => setShowSearchInput(true)}
                            className={`hover:opacity-70 hover:cursor-pointer transition-all duration-300`}
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                    )}
                    {showSearchInput && (
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    setShowSearchInput(false);
                                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                                    setSearchQuery('');
                                }
                            }}
                            className={`w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 animate-fadeIn`}
                        />
                    )}
                </div>

                {/* Show a mini centered logo only on non-home pages so users can return home */}
                {!isHome && (
                    <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
                        <Link to="/" className="hover:opacity-70 transition-opacity">WEARÉ</Link>
                    </h1>
                )}

                <div className={`flex items-center gap-6`}>
                    {/* Cart with badge */}
                    <Link to="/cart" className={`relative hover:opacity-70 transition-opacity`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && (
                            <span className={`absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center`}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Wishlist with badge - Protected */}
                    <Link to="/wishlist" className={`relative hover:opacity-70 transition-opacity`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {wishlistCount > 0 && (
                            <span className={`absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center`}>
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Profile Icon - Shows menu if authenticated, redirects to login if not */}
                    <div ref={userMenuRef} className="relative">
                        <button
                            onClick={handleProfileClick}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Profile"
                        >
                            {isAuthenticated ? (
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                                    {getUserInitials()}
                                </div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            )}
                        </button>

                        {isAuthenticated && showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="font-semibold">{user?.name}</p>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                </div>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    to="/cart"
                                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    My Cart
                                </Link>
                                <Link
                                    to="/wishlist"
                                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    My Wishlist
                                </Link>
                                <div className="border-t border-gray-200 mt-2 pt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ONLY render the big hero section on the homepage! */}
            {isHome && (
                <div className="animate-fadeIn">
                    <h1 className={`text-3xl py-4 font-bold text-center`}><Link to='/'>WEARÉ</Link></h1>
                    <nav className={`w-full flex justify-center mb-5`}>
                        <ul className={`flex gap-4`}>
                            <li>
                                <button
                                    onClick={() => onCategoryChange('Men')}
                                    className={`px-2 py-2 hover:opacity-70 transition-opacity ${selectedCategory === 'Men' ? 'font-semibold border-b-2 border-black' : ''}`}
                                >
                                    MEN
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onCategoryChange('Women')}
                                    className={`px-2 py-2 hover:opacity-70 transition-opacity ${selectedCategory === 'Women' ? 'font-semibold border-b-2 border-black' : ''}`}
                                >
                                    WOMEN
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onCategoryChange('Kids')}
                                    className={`px-2 py-2 hover:opacity-70 transition-opacity ${selectedCategory === 'Kids' ? 'font-semibold border-b-2 border-black' : ''}`}
                                >
                                    KIDS
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className={`w-full flex items-center justify-center gap-6 px-8 py-6`}>
                        <span className={`grow h-px bg-gray-400`}></span>
                        <h2 className={`text-sm tracking-[0.2em] uppercase whitespace-nowrap`}>Everyday Elevated</h2>
                        <span className={`grow h-px bg-gray-400`}></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header