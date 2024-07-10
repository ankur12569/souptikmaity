"use client";

import React, { useEffect, useState } from "react";
import QuarterCircularProgressBar from "./QuarterCircularProgressBar";

const CircularNav = ({ inViewPort, cursor, setCursor }) => {
    const [showMenu, setShowMenu] = useState({ visible: true, collapse: true });
    const [scrollThrottle, setScrollThrottle] = useState();
    const [scrollAngle, setScrollAngle] = useState(0);

    const handleShowMenu = () => {
        setShowMenu({ visible: !showMenu.visible, collapse: true });
    };

    const handleNavigation = (id) => {
        const elem = document.getElementById(id);
        setShowMenu({ visible: false, collapse: true });
        elem.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollThrottle) {
                return;
            }
            const newThrottleId = setTimeout(() => {
                setShowMenu({ visible: true, collapse: true });
                clearTimeout(newThrottleId);
                setScrollThrottle(null);
            }, 200);

            const windowHeight = window.innerHeight;
            const documentHeight =
                document.documentElement.scrollHeight - windowHeight;
            const scrollPosition = window.scrollY;
            const percentage = (scrollPosition / documentHeight) * 25;
            setScrollAngle(percentage);

            setScrollThrottle(newThrottleId);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollThrottle) clearTimeout(scrollThrottle);
        };
    }, [scrollThrottle]);

    useEffect(() => {
        if (showMenu.visible && showMenu.collapse) {
            const timer = setTimeout(() => {
                setShowMenu({ visible: false, collapse: true });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showMenu]);

    const menuItems = [
        { name: "Home", rotation: "-rotate-[10deg]" },
        { name: "About", rotation: "-rotate-[27.5deg]" },
        { name: "Blogs", rotation: "-rotate-[45deg]" },
        { name: "Images", rotation: "-rotate-[62.5deg]" },
        { name: "Contact", rotation: "-rotate-[80deg]" },
    ];

    return (
        <div>
            <div
                className={`scale-[.80] md:scale-100 fixed text-white top-0 right-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full flex justify-center items-center transition duration-700 ease-in-out ${
                    showMenu.visible
                        ? " bg-gradient-to-b from-white to-transparent backdrop-blur-sm"
                        : ""
                } `}
                onMouseEnter={() => {
                    setShowMenu({ visible: true, collapse: false });
                }}
                onMouseLeave={() => {
                    setShowMenu({ visible: false, collapse: true });
                }}>
                <div
                    className={`absolute ${
                        showMenu.visible ? " scale-105" : "scale-125"
                    } transition duration-700 ease-in-out `}>
                    <QuarterCircularProgressBar percentage={scrollAngle} />
                </div>

                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`absolute  w-full transition ease-in-out duration-700 ${
                            showMenu.visible
                                ? `${item.rotation}`
                                : `rotate-[15deg]`
                        }`}>
                        <button
                            className={`w-1/5 text-right hover:scale-150 transition duration-700 ease-in-out ${
                                inViewPort === item.name
                                    ? "text-[#f4dfa4] scale-125"
                                    : ""
                            }`}
                            onClick={() => handleNavigation(item.name)}
                            onMouseEnter={() => {
                                setCursor("pointer");
                            }}
                            onMouseLeave={() => {
                                setCursor("normal");
                            }}>
                            {item.name}
                        </button>
                    </div>
                ))}

                <button
                    onClick={handleShowMenu}
                    onMouseEnter={() => {
                        setCursor("pointer");
                    }}
                    onMouseLeave={() => {
                        setCursor("normal");
                    }}
                    className={`text-white  ${
                        showMenu.visible
                            ? "bg-gray-500 scale-100"
                            : "bg-gray-700 scale-125"
                    }  flex items-end justify-center text-2xl rounded-full h-40 w-40 rotate-45 p-2 transition duration-700 ease-in-out`}>
                    Menu
                </button>
            </div>
        </div>
    );
};

export default CircularNav;
