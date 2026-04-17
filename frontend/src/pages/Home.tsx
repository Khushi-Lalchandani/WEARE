import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import NewArrivals from '../components/NewArrivals';
import BestSellers from '../components/BestSellers';
import Testimonials from '../components/Testimonials';

interface HomeProps {
    selectedCategory: string;
}

const Home = ({ selectedCategory }: HomeProps) => {
    return (
        <div>
            <HeroSection />
            <FeaturedProducts selectedCategory={selectedCategory} />
            <NewArrivals selectedCategory={selectedCategory} />
            <BestSellers selectedCategory={selectedCategory} />
            <Testimonials />
        </div>
    );
};

export default Home;
