"use client";

import React, { useEffect, useRef } from "react";

const Background = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });
    const repelRef = useRef(false);
    const mouseMoveTimerRef = useRef(null);
    const isMouseMovingRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = [
            "#fff",
            "#fff",
            "#3CFF57",
            "#FF7342",
            "#FFFE9D",
            "#37B8C8",
        ]; // Array of colors

        class Particle {
            constructor(x, y, radius, color, blur) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.blur = blur;
                this.velocity = {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                };
                this.maxSpeed = 5;
                this.repulsionRadius = 25; // Adjust as needed
                this.repulsionForce = 0.2; // Adjust as needed
            }

            draw() {
                ctx.save(); // Save the current state
                ctx.shadowBlur = this.blur;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
                ctx.restore(); // Restore the state
            }

            update(particles) {
                const { x: mouseX, y: mouseY } = mouseRef.current;
                if (
                    mouseX !== null &&
                    mouseY !== null &&
                    isMouseMovingRef.current
                ) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 100;
                    const force = (maxDistance - distance) / maxDistance;
                    const direction = repelRef.current ? -1 : 1;

                    if (distance < maxDistance) {
                        this.velocity.x +=
                            direction * (dx / distance) * force * 0.5;
                        this.velocity.y +=
                            direction * (dy / distance) * force * 0.5;
                    }
                }

                particles.forEach((particle) => {
                    if (particle !== this) {
                        const dx = particle.x - this.x;
                        const dy = particle.y - this.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < this.repulsionRadius) {
                            const force =
                                (this.repulsionRadius - distance) /
                                this.repulsionRadius;
                            this.velocity.x -=
                                (dx / distance) * force * this.repulsionForce;
                            this.velocity.y -=
                                (dy / distance) * force * this.repulsionForce;
                        }
                    }
                });

                // capping the maximum speed of particles
                const speed = Math.sqrt(
                    this.velocity.x * this.velocity.x +
                        this.velocity.y * this.velocity.y
                );
                if (speed > this.maxSpeed) {
                    this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
                    this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
                }

                // refelction from border
                if (
                    this.x - this.radius < 0 ||
                    this.x + this.radius > canvas.width
                ) {
                    this.velocity.x = -this.velocity.x;
                }

                if (
                    this.y - this.radius < 0 ||
                    this.y + this.radius > canvas.height
                ) {
                    this.velocity.y = -this.velocity.y;
                }

                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.draw();
            }

            // calculating distance from other particles
            calculateDistance(particle) {
                const dx = this.x - particle.x;
                const dy = this.y - particle.y;
                return Math.sqrt(dx * dx + dy * dy);
            }

            countNeighbors(particles) {
                return particles.reduce((count, particle) => {
                    if (
                        particle !== this &&
                        this.calculateDistance(particle) < 30
                    ) {
                        return count + 1;
                    }
                    return count;
                }, 0);
            }
        }

        let particles = [];
        const createParticles = () => {
            let density = Math.round(
                (window.innerWidth * window.innerHeight) / 20000 //number of particles
            );
            particles = [];
            for (let i = 0; i < density; i++) {
                const radius = Math.random() * 6 + 1;
                const x = Math.random() * (canvas.width - radius * 2) + radius;
                const y = Math.random() * (canvas.height - radius * 2) + radius;
                const color = colors[Math.floor(Math.random() * colors.length)]; // Random color from array
                const blur = Math.random() * 50; // Random blur value
                particles.push(new Particle(x, y, radius, color, blur));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update(particles);
                const neighborsCount = particle.countNeighbors(particles);
                if (neighborsCount > 5) {
                    handleNeighborTrigger(particle);
                }
            });
            animationRef.current = requestAnimationFrame(animate);
        };

        const handleNeighborTrigger = (particle) => {
            repelRef.current = true;
            setTimeout(() => {
                repelRef.current = false;
            }, 1000);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        };

        const debounce = (func, wait) => {
            let timeout;
            return () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func();
                }, wait);
            };
        };

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            isMouseMovingRef.current = true;

            clearTimeout(mouseMoveTimerRef.current);
            mouseMoveTimerRef.current = setTimeout(() => {
                isMouseMovingRef.current = false;
            }, 5000); // 5000 = 5 seconds of inactivity
        };

        const handleClick = () => {
            repelRef.current = true;
            setTimeout(() => {
                repelRef.current = false;
            }, 1000);
        };

        createParticles();
        animate();

        const debouncedResize = debounce(handleResize, 100);
        window.addEventListener("resize", debouncedResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", debouncedResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
        />
    );
};

export default Background;
