import { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance every 5 seconds
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isPaused]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section
            className={`w-full py-16 bg-gray-50`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <SectionTitle title="What Our Customers Say" />

            <div className={`container mx-auto px-8 max-w-4xl`}>
                <div className={`relative bg-white rounded-2xl shadow-lg p-12`}>
                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-all duration-300`}
                        aria-label="Previous testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-all duration-300`}
                        aria-label="Next testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    {/* Testimonial Content */}
                    <div className={`text-center animate-fadeIn`}>
                        {/* Customer Photo */}
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden`}>
                            <img
                                src={`https://i.pravatar.cc/150?img=${currentIndex + 1}`}
                                alt={currentTestimonial.name}
                                className={`w-full h-full object-cover`}
                            />
                        </div>

                        {/* Star Rating */}
                        <div className={`flex justify-center gap-1 mb-6`}>
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={`text-yellow-400`}
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className={`text-xl text-gray-700 mb-6 italic leading-relaxed`}>
                            "{currentTestimonial.quote}"
                        </blockquote>

                        {/* Customer Info */}
                        <div>
                            <p className={`font-semibold text-lg`}>{currentTestimonial.name}</p>
                            <p className={`text-gray-600 text-sm`}>{currentTestimonial.location}</p>
                        </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className={`flex justify-center gap-2 mt-8`}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-black w-8' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
