// frontend/src/components/SplashPage/index.js
import React, { useState, useEffect } from "react";
import "./SplashPage.css";

// Dynamically import all images from a folder
const imageContext = require.context(
    "../../assets/splash",
    false,
    /\.(jpg|jpeg|png)$/
);

const images = imageContext.keys().map(imageContext);

const SplashPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Preload images
    useEffect(() => {
        images.forEach((image) => {
            new Image().src = image;
        });
    }, []);

    // Switch images
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length
            );
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div
            className="splash-container"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
            <div className="splash-text">
                <h1>Find Your Inspiration</h1>
                <p>
                    Join the Seer community, home to tens of billions of photos
                    and 2 million groups.
                </p>
            </div>
        </div>
    );
};

export default SplashPage;
