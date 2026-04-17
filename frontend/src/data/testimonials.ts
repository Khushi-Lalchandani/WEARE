export interface Testimonial {
    id: number;
    name: string;
    location: string;
    quote: string;
    rating: number;
    image: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "New York, NY",
        quote: "Absolutely love the quality and style! Every piece I've purchased has exceeded my expectations. The attention to detail is remarkable.",
        rating: 5,
        image: "/images/testimonial-1.png",
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Los Angeles, CA",
        quote: "The best online shopping experience I've had. Fast shipping, beautiful packaging, and the clothes fit perfectly. Highly recommend!",
        rating: 5,
        image: "/images/testimonial-2.png",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        location: "Chicago, IL",
        quote: "I'm obsessed with their collection! The fabrics are luxurious and the designs are timeless. My wardrobe has never looked better.",
        rating: 5,
        image: "/images/testimonial-3.png",
    },
    {
        id: 4,
        name: "David Thompson",
        location: "Seattle, WA",
        quote: "Outstanding customer service and premium quality products. I've been a loyal customer for over a year now and never disappointed.",
        rating: 5,
        image: "/images/testimonial-4.png",
    },
    {
        id: 5,
        name: "Jessica Lee",
        location: "Miami, FL",
        quote: "The perfect blend of elegance and comfort. These pieces transition seamlessly from work to weekend. Worth every penny!",
        rating: 5,
        image: "/images/testimonial-5.png",
    },
];
