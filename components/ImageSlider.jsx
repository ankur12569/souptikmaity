import React, { useEffect, useState } from "react";

const ImageSlider = ({ images, trigger }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Update currentIndex based on trigger change
    useEffect(() => {
        const newIndex = images.findIndex((img) => img.name === trigger);
        if (newIndex !== -1) {
            setCurrentIndex(newIndex);
        }
    }, [images, trigger]);

    return (
        <div className="relative w-64 h-64 overflow-hidden pointer-events-none">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                        currentIndex === index ? "opacity-100" : "opacity-0"
                    }`}>
                    <img
                        src={image.url}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageSlider;
