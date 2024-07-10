"use client";

import React, { useEffect, useRef, useState } from "react";
import CurvedArrow from "./CurvedArrow";
import CircularNav from "./CircularNav";
import MusicPlayer from "./MusicPlayer";
import TypewriterEffect from "./TypewriterEffect";
import ImageSlider from "./ImageSlider";

import About from "./About";
import Contacts from "./Contacts";

import Logo from "./Logo";

import Background from "./Background";
import Cursor from "./Cursor";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home = () => {
    const HomeRef = useRef();
    const AboutRef = useRef();
    const BlogsRef = useRef();
    const ImagesRef = useRef();
    const ContactRef = useRef();

    const welcomeScreenInstructionRef = useRef();

    const [cursor, setCursor] = useState("normal");

    const words = [
        {
            word: "Experimenting",
            colorClass: "text-red-500",
            fontClass: "font-sans",
        },
        {
            word: "Coding",
            colorClass: "text-blue-500",
            fontClass: "font-mono",
        },
        {
            word: "Drawing",
            colorClass: "text-green-500",
            fontClass: "font-serif",
        },
    ];

    const name = "Souptik Maity";

    const images = [
        { name: "Experimenting", url: "./Experimenting.jpeg" },
        { name: "Coding", url: "./Coding.jpeg" },
        { name: "Drawing", url: "./Drawing.jpeg" },
    ];

    const [animationStatus, setAnimationStatus] = useState({
        myself: false,
        slidingName: false,
    });

    const [triggerName, setTriggerName] = useState(null);

    const [inViewPort, setInViewPort] = useState();

    const [welcomed, setWelcomed] = useState(false);

    const [musicStatus, setMusicStatus] = useState({
        isResponded: false,
        value: false,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [startTyping, setStartTyping] = useState(false);

    const [arrowStartPosition, setArrowStartPosition] = useState({
        x: 0,
        y: 0,
    });

    const [welcomeScreenAnimationEnd, setWelcomeScreenAnimationEnd] =
        useState(false);

    // handle image and text timings
    const handleWordStart = (obj) => {
        setTriggerName(obj.word);
    };

    // handle scrolling
    useEffect(() => {
        const handleScroll = () => {
            const viewportCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            };

            let closestDiv = null;
            let minDistance = Infinity;

            // List of div refs
            const divRefs = [
                HomeRef,
                AboutRef,
                BlogsRef,
                ImagesRef,
                ContactRef,
            ];

            divRefs.forEach((divRef, index) => {
                const rect = divRef.current.getBoundingClientRect();

                if (
                    viewportCenter.y >= rect.top &&
                    viewportCenter.y <= rect.bottom
                ) {
                    closestDiv = divRef;
                    return; // Exit forEach early since we found the closest div
                }
            });
            if (closestDiv) {
                setInViewPort(closestDiv.current.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // handle animations
    useGSAP(() => {
        var tlHome = gsap.timeline({ paused: !musicStatus.isResponded });
        var tlWelcome = gsap.timeline();

        tlWelcome.to(".welcomeText", {
            opacity: 1,
            duration: 2,
            delay: 1,
            ease: "power4.out",
            stagger: 1,
            onComplete: () => {
                setWelcomeScreenAnimationEnd(true);
            },
        });

        tlHome.to("#welcome", {
            opacity: 0,
            duration: 2,
            onComplete: () => {
                setWelcomed(true);
                setCursor("normal");
            },
        });

        tlHome.to(".navigation", {
            opacity: 1,
            duration: 1,
            delay: 0,
        });

        tlHome.to(".myself", {
            opacity: 1,
            duration: 1,
            stagger: 0.5,
            onComplete: () => {
                setAnimationStatus({ myself: true, slidingName: false });
            },
        });

        tlHome.to(".slidingName", {
            opacity: 1,
            duration: 2,
            ease: "power4.out",
            stagger: { each: 0.2, from: "start" },
            onComplete: () => {
                setAnimationStatus({ myself: true, slidingName: true });
            },
        });

        tlHome.to(".codingStyle", {
            opacity: 0,
            x: "-100vw",
            duration: 2.5,
            ease: "elastic.out(1,0.3)",
            runBackwards: true,
            onComplete: () => {
                setStartTyping(true);
            },
        });

        tlHome.to(".slidingImages", {
            opacity: 1,
            delay: 3,
        });
    }, [musicStatus]);

    // get arrow starting position
    useEffect(() => {
        const getwelcomeScreenInstructionBox = () => {
            if (!welcomeScreenInstructionRef.current) {
                return;
            }

            const welcomeScreenInstructionBox =
                welcomeScreenInstructionRef.current.getBoundingClientRect();

            setArrowStartPosition({
                x: welcomeScreenInstructionBox.left,
                y:
                    (welcomeScreenInstructionBox.top +
                        welcomeScreenInstructionBox.bottom) /
                    2,
            });
        };

        requestAnimationFrame(() => {
            getwelcomeScreenInstructionBox();
        });

        window.addEventListener("resize", getwelcomeScreenInstructionBox);
        return () =>
            window.removeEventListener(
                "resize",
                getwelcomeScreenInstructionBox
            );
    }, [welcomeScreenAnimationEnd]);

    // handle document loading
    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="h-screen w-full text-7xl bg-gradient-to-bl from-gray-400 to-gray-800 flex items-center justify-center flex-col">
                    <div className="w-[300px] flex flex-col items-center justify-center mask">
                        <svg
                            width="100px"
                            height="100px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="gear">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z"
                                fill="#fff"
                            />
                        </svg>
                    </div>
                    <div className="bg-gradient-to-tr from-slate-500 to-slate-200 w-[300px] h-2 rounded-full shadow-black shadow-md"></div>

                    <div className=" mt-5 text-white textShadow animate-pulse">
                        loading
                    </div>
                </div>
            ) : null}

            <div
                id="LandingPage"
                className={`w-full bg-gradient-to-bl  ${
                    isLoading ? "hidden" : ""
                } ${welcomed ? "" : " h-screen overflow-hidden"}`}>
                {welcomed ? null : (
                    <div>
                        <div
                            id="welcome"
                            className=" fixed h-screen w-full backdrop-blur-md flex items-center justify-center flex-col opacity-1 z-50">
                            <div className="text-6xl text-white textShadow welcomeText opacity-0">
                                Welcome
                            </div>

                            <div className="mt-10 text-white welcomeText opacity-0">
                                Turn on background music?
                            </div>
                            <div className="flex items-center justify-center gap-5 mt-2 p-2 welcomeText opacity-0 z-30">
                                <button
                                    className="bg-white/80 p-2 rounded-xl flex flex-col items-center justify-center w-16 hover:scale-125 hover:bg-white transition ease-in-out duration-500"
                                    onClick={() => {
                                        setMusicStatus({
                                            isResponded: true,
                                            value: true,
                                        });
                                    }}
                                    onMouseEnter={() => {
                                        setCursor("pointer_black");
                                    }}
                                    onMouseLeave={() => {
                                        setCursor("normal");
                                    }}>
                                    Yes
                                    <svg
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10.4587 4.71321C11.476 4.50597 12.524 4.50597 13.5413 4.71321C16.947 5.40696 19.5666 8.08688 20.2726 11.4523C19.8627 11.2485 19.4016 11.134 18.9141 11.134C18.5532 11.134 18.1939 11.1845 17.8466 11.2841L17.578 11.3611C16.0326 11.804 14.8649 13.0899 14.5584 14.6863C14.3833 15.5982 14.3833 16.5358 14.5584 17.4477C14.8649 19.0442 16.0326 20.3301 17.578 20.773L17.8466 20.85C18.1939 20.9495 18.5532 21 18.9141 21C20.6184 21 22 19.6011 22 17.8754L22 12.9248L21.9757 12.566C21.6624 7.94133 18.3328 4.10026 13.8447 3.18603C12.6271 2.93799 11.3729 2.93799 10.1553 3.18603C5.66717 4.10026 2.33756 7.94133 2.0243 12.566L2 12.9248L2.00001 17.8754C2 19.6011 3.38158 21 5.08586 21C5.44684 21 5.80608 20.9495 6.15342 20.85L6.42199 20.773C7.96742 20.3301 9.13514 19.0442 9.44163 17.4477C9.6167 16.5358 9.6167 15.5982 9.44163 14.6863C9.13514 13.0899 7.96743 11.804 6.42199 11.3611L6.15342 11.2841C5.80609 11.1845 5.44684 11.134 5.08586 11.134C4.5984 11.134 4.13733 11.2485 3.72744 11.4523C4.4334 8.08687 7.05297 5.40696 10.4587 4.71321Z"
                                            fill="#363853"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="bg-white/80 p-2 rounded-xl flex flex-col items-center justify-center w-16 hover:scale-125 hover:bg-white transition ease-in-out duration-500"
                                    onClick={() => {
                                        setMusicStatus({
                                            isResponded: true,
                                            value: false,
                                        });
                                    }}
                                    onMouseEnter={() => {
                                        setCursor("pointer_black");
                                    }}
                                    onMouseLeave={() => {
                                        setCursor("normal");
                                    }}>
                                    No
                                    <svg
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.7957 3.191C22.0681 2.91855 22.0681 2.4768 21.7957 2.20434C21.5232 1.93189 21.0815 1.93189 20.809 2.20434L17.9857 5.02766C16.7935 4.10187 15.3887 3.43585 13.8468 3.11846C12.6279 2.86754 11.3722 2.86754 10.1532 3.11846C5.65611 4.04418 2.33637 7.9279 2.02427 12.584L2.00003 12.9456V16.6705L2.00004 16.6733L2.00004 17.9833C2.00003 18.8229 2.33021 19.5873 2.86812 20.1452L2.20434 20.809C1.93189 21.0815 1.93189 21.5232 2.20434 21.7957C2.4768 22.0681 2.91855 22.0681 3.191 21.7957L21.7957 3.191ZM13.5655 4.48515C14.8323 4.74591 15.9924 5.28014 16.99 6.02335L9.09702 13.9163C8.60981 12.7288 7.61421 11.8052 6.36174 11.4424L6.09109 11.364C5.74679 11.2643 5.39047 11.2137 5.0323 11.2137C4.49243 11.2137 3.98799 11.3563 3.55146 11.6055C4.2132 8.04746 6.91755 5.20912 10.4346 4.48515C11.4679 4.27244 12.5322 4.27244 13.5655 4.48515Z"
                                            fill="#363853"
                                        />
                                        <path
                                            d="M20.5052 7.87394C20.3071 7.54348 19.8785 7.43623 19.5481 7.63439C19.2176 7.83254 19.1104 8.26107 19.3085 8.59153C19.8552 9.50318 20.2468 10.521 20.4485 11.6055C20.012 11.3563 19.5076 11.2137 18.9677 11.2137C18.6096 11.2137 18.2532 11.2643 17.9089 11.364L17.6383 11.4424C16.1034 11.8869 14.9545 13.1734 14.6537 14.7568C14.4799 15.6715 14.4799 16.6119 14.6537 17.5266C14.9545 19.11 16.1034 20.3965 17.6383 20.841L17.9089 20.9194C18.2532 21.0191 18.6096 21.0698 18.9677 21.0698C20.6574 21.0698 22 19.6727 22 17.9833V16.6747L22 16.6705V12.9456L21.9758 12.584C21.8611 10.8731 21.3406 9.2671 20.5052 7.87394Z"
                                            fill="#363853"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div
                                ref={welcomeScreenInstructionRef}
                                className="fixed translate-y-1/2 bottom-1/4 right-5 text-xs text-white/50 welcomeText opacity-0 bg-gray-700/50 py-1 px-2 rounded-full">
                                You can change preferences at any time from{" "}
                                <span className="text-blue-200/75 text-sm">
                                    Here
                                </span>
                            </div>
                            <div
                                className={`transition duration-300 ease-in-out ${
                                    welcomeScreenAnimationEnd
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}>
                                <CurvedArrow
                                    startX={arrowStartPosition.x}
                                    startY={arrowStartPosition.y}
                                    endX={30}
                                    endY={50}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Home component */}
                <div
                    id="Home"
                    ref={HomeRef}
                    className="flex flex-col md:flex-row h-screen items-center justify-center">
                    <div className=" p-10 flex flex-col items-start justify-center md:w-1/2 ">
                        <div className="text-white text-5xl mb-2 w-full flex flex-col">
                            <div className="flex flex-col gap-2 ">
                                <div className=" opacity-0 myself text-4xl mb-5 w-full items-center justify-center flex gap-2 text-emerald-400">
                                    <div>Hello!</div>
                                    <div className="animate-[wiggle_1s_ease-in-out_infinite] ">
                                        &#x1F590;
                                    </div>
                                </div>
                                <div className=" opacity-0 myself text-xl mb-4 text-gray-400 italic">
                                    I am
                                </div>
                            </div>

                            <div
                                className={`flex w-full md:w-min justify-center ${
                                    animationStatus.myself
                                        ? "visible"
                                        : "invisible"
                                }`}>
                                {name.split("").map((char, i) => (
                                    <div
                                        className="slidingName opacity-0"
                                        key={i}>
                                        {char === " " ? "\u00A0" : char}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className={` bg-[#121212] p-5 w-full max-w-md h-24 mt-10 flex gap-2 items-center opacity-100 codingStyle ${
                                animationStatus.slidingName
                                    ? "visible"
                                    : "invisible"
                            }`}>
                            <div className="text-white indicator text-nowrap ">
                                &#62; &#95;
                            </div>
                            <TypewriterEffect
                                words={words}
                                initialDelay={3000}
                                onWordStart={handleWordStart}
                                shouldStart={startTyping}
                            />
                        </div>
                    </div>
                    <div className="slidingImages opacity-0 md:w-1/2 flex items-center justify-center">
                        <ImageSlider images={images} trigger={triggerName} />
                    </div>
                </div>

                <div id="About" ref={AboutRef} className="">
                    <About
                        welcomed={welcomed}
                        cursor={cursor}
                        setCursor={setCursor}
                    />
                </div>
                <div
                    id="Blogs"
                    ref={BlogsRef}
                    className=" mt-20 text-center text-white animate-pulse ">
                    Blogs are coming soon
                </div>
                <div
                    id="Images"
                    ref={ImagesRef}
                    className=" mt-20 text-center text-white animate-pulse ">
                    Images are coming soon
                </div>
                <div id="Contact" ref={ContactRef}>
                    <Contacts cursor={cursor} setCursor={setCursor} />
                </div>

                <div className="opacity-0 navigation">
                    <CircularNav
                        inViewPort={inViewPort}
                        cursor={cursor}
                        setCursor={setCursor}
                    />
                </div>

                <div>
                    <MusicPlayer
                        src="./music.mp3"
                        status={musicStatus.value}
                        cursor={cursor}
                        setCursor={setCursor}
                    />
                </div>
            </div>

            <div className="fixed bg-gray-900 w-screen h-screen top-0 left-0 -z-50">
                <div className="opacity-25">
                    <Background />
                </div>
            </div>

            <div>
                <Cursor cursor={cursor} />
            </div>

            <div>
                <Logo />
            </div>
        </div>
    );
};

export default Home;
