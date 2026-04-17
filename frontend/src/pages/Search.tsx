import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import type { Product } from '../data/products';
import ProductCard from '../components/ProductCard';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                // Ignore category and tag, just pass keyword
                const data = await fetchProducts(undefined, undefined, query);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="container mx-auto px-8 py-12 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-500 mb-8">
                {loading ? 'Searching...' : `Showing results for "${query}"`}
            </p>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No matching products found.</h2>
                    <p className="text-gray-500">Try searching for a completely different term like "shirt" or "jacket".</p>
                </div>
            )}
        </div>
    );
};

export default Search;
