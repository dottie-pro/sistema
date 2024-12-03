import { useState } from 'react';

export const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            src: "https://mf-planejados.s3.amazonaws.com/carousel_2.png",
            alt: "Third Slide"
        },
        {
            src: "https://mf-planejados.s3.amazonaws.com/carousel_1.png",
            alt: "Second Slide"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="w-full">
            <div className="relative w-full">
                <div className="overflow-hidden relative h-auto rounded-lg sm:h-64 xl:h-[24rem] 2xl:h-96">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${currentSlide === index ? 'block' : 'hidden'
                                }`}
                        >
                            <img
                                src={slide.src}
                                className="block w-full h-full object-cover"
                                alt={slide.alt}
                            />
                        </div>
                    ))}
                </div>
                {/* Slider indicators */}
                <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-white'}`}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
                {/* Slider controls */}
                <button
                    type="button"
                    className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    onClick={prevSlide}
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    onClick={nextSlide}
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </div>
    );
};
