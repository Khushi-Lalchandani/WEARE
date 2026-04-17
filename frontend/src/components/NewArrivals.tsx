import { useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';
import type { Product } from '../data/products';

interface NewArrivalsProps {
    selectedCategory: string;
}

const NewArrivals = ({ selectedCategory }: NewArrivalsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts('new');
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch new arrivals", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const filteredProducts = products.filter(
        product => selectedCategory === 'All' || product.category === selectedCategory
    );

    if (loading) return <div>Loading...</div>;

    return (
        <section className={`w-full py-12 bg-gray-50`}>
            <SectionTitle title="New Arrivals" subtitle="Fresh styles just landed" />

            <div className={`container mx-auto px-8 relative`}>
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300`}
                    aria-label="Scroll left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300`}
                    aria-label="Scroll right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className={`flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12`}
                >
                    {filteredProducts.map((product) => (
                        <div key={product.id} className={`shrink-0 w-72`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
