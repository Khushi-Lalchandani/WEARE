import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';
import type { Product } from '../data/products';

interface BestSellersProps {
    selectedCategory: string;
}

const BestSellers = ({ selectedCategory }: BestSellersProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts('best-seller');
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch best sellers", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filteredProducts = products.filter(
        product => selectedCategory === 'All' || product.category === selectedCategory
    );

    if (loading) return <div>Loading...</div>;

    return (
        <section className={`w-full py-12 bg-white`}>
            <SectionTitle title="Best Sellers" subtitle="Customer favorites you'll love" />

            <div className={`container mx-auto px-8`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* View All Link */}
                <div className={`text-center mt-12`}>
                    <a href="/shop" className={`inline-block text-lg font-semibold border-b-2 border-black pb-1 hover:opacity-70 transition-opacity`}>
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
