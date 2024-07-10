import React, { useState, useEffect, useRef } from "react";

const BurstingParticles = ({ point }) => {
    const [particles, setParticles] = useState([]);
    const particlesRef = useRef([]);

    useEffect(() => {
        if (point) {
            const numParticles = 50; // Number of particles
            const range = 500; // Range of burst (adjust as needed)
            const newParticles = Array.from({ length: numParticles }, () => {
                const angle = Math.random() * Math.PI * 2; // Random angle in radians
                const distance = Math.random() * range; // Random distance within range
                return {
                    x: point.x + distance * Math.cos(angle),
                    y: point.y + distance * Math.sin(angle),
                    size: getRandomSize(),
                };
            });
            setParticles(newParticles);

            // Save a reference to the particles DOM elements
            particlesRef.current = particlesRef.current.slice(0, numParticles);

            // Animate particles using requestAnimationFrame
            const startTime = performance.now();
            const animateParticles = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                particlesRef.current.forEach((particle, index) => {
                    const { x, y } = newParticles[index];
                    const progress = Math.min(1, elapsedTime / 1000); // Limit to 1 second
                    const newX = point.x + (x - point.x) * progress;
                    const newY = point.y + (y - point.y) * progress;
                    particle.style.transform = `translate(${newX}px, ${newY}px)`;
                    particle.style.opacity = 1 - progress; // Fade out over 1 second
                });
                if (elapsedTime < 1000) {
                    requestAnimationFrame(animateParticles);
                }
            };
            requestAnimationFrame(animateParticles);
        }
    }, [point]);

    const getRandomSize = () => {
        return Math.floor(Math.random() * 10) + 1; // Random size between 1 and 10
    };

    return (
        <div className="relative bursting-particles pointer-events-none">
            {particles.map((particle, index) => (
                <div
                    ref={(el) => (particlesRef.current[index] = el)}
                    key={index}
                    className="particle"
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        top: 0,
                        left: 0,
                        position: "absolute",
                        backgroundColor: "#fff", // White color
                        borderRadius: "50%", // Round shape
                    }}
                ></div>
            ))}
        </div>
    );
};

export default BurstingParticles;
