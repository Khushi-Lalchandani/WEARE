import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';
import type { Product } from '../data/products';

interface FeaturedProductsProps {
    selectedCategory: string;
}

const FeaturedProducts = ({ selectedCategory }: FeaturedProductsProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts('featured');
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch featured products", error);
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
            <SectionTitle title="Featured" subtitle="Handpicked pieces for the discerning you" />

            <div className={`container mx-auto px-8`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
