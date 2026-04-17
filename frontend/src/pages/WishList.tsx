import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeFromWishlist, clearWishlist } from '../store/wishListSlice';
import { addToCart } from '../store/cartSlice';

const WishList = () => {
    const { items } = useSelector((state: RootState) => state.wishList);
    const dispatch = useDispatch();

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
        dispatch(removeFromWishlist(product.id));
    };

    return (
        <div className="container mx-auto p-8 min-h-screen">
            <h2 className="text-3xl font-bold mb-8">My Wishlist ({items.length} items)</h2>

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <p className="text-gray-500 text-xl mb-6">Your wishlist is empty</p>
                    <a href="/" className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Continue Shopping
                    </a>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-600">Save your favorite items here</p>
                        <button
                            onClick={() => dispatch(clearWishlist())}
                            className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                        >
                            Clear Wishlist
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <button
                                        onClick={() => dispatch(removeFromWishlist(item.id))}
                                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                                        aria-label="Remove from wishlist"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                                    <p className="text-xl font-bold mb-4">${item.price.toFixed(2)}</p>

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishList;