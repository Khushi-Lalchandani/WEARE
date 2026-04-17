const HeroSection = () => {
    return (
        <section className={`relative w-full h-[600px] bg-gray-200 flex items-center justify-center overflow-hidden`}>
            {/* Background Image with Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-black/40 to-black/20`}>
                <div className={`w-full h-full bg-cover bg-center`} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80)' }}></div>
            </div>

            {/* Content */}
            <div className={`relative z-10 text-center text-white px-8 max-w-4xl`}>
                <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight`}>
                    Elevate Your Everyday Style
                </h1>
                <p className={`text-xl md:text-2xl mb-8 font-light tracking-wide`}>
                    Discover timeless pieces that define modern elegance
                </p>
                <button className={`bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                    Shop New Arrivals
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
