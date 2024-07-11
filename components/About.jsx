"use client";

import React, { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = ({ welcomed, cursor, setCursor }) => {
    const openTechknowlogic = () => {
        window.open("https://www.techknowlogic.in", "_blank");
    };

    useGSAP(() => {
        var tlAbout = gsap.timeline();

        tlAbout.from("#AboutHeading", {
            opacity: 0,
            scrollTrigger: {
                trigger: "#AboutHeading",
                scroller: "body",
                start: "bottom 75%",
                end: "bottom 50%",
                scrub: true,
            },
        });

        tlAbout.from(".AboutContentParagraph", {
            opacity: 0,
            y: "100%",
            stagger: 0.3,
            yoyo: true,
            scrollTrigger: {
                trigger: ".AboutContentParagraph",
                scroller: "body",
                start: "top 75%",
                end: "top 25%",
                scrub: true,
            },
        });

        tlAbout.fromTo(
            "#AboutEducationText1",
            { y: "100px" },
            {
                y: "-100px",
                scrollTrigger: {
                    trigger: "#AboutEducationImage1",
                    scroller: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        tlAbout.fromTo(
            "#AboutEducationText2",
            { y: "100px" },
            {
                y: "-100px",
                scrollTrigger: {
                    trigger: "#AboutEducationImage2",
                    scroller: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".ProgrammingSkillsTitle",
            { opacity: 0 },
            {
                opacity: 1,
                stagger: 0.5,
                scrollTrigger: {
                    trigger: ".ProgrammingSkillsTitle",
                    scroller: "body",
                    start: "top 75%",
                    end: "top 75%",
                    toggleActions: "restart none reverse none",
                },
            }
        );

        gsap.fromTo(
            ".ProgrammingLogos",
            {
                x: "500%",
                opacity: 0,
            },
            {
                x: "0",
                opacity: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".ProgrammingLogos",
                    start: "bottom 85%",
                    end: "bottom 85%",
                    toggleActions: "restart none reverse none",
                },
            }
        );

        gsap.fromTo(
            ".ProgrammingLogos",
            {
                x: "-500%",
                opacity: 0,
            },
            {
                x: "0",
                opacity: 1,
                stagger: 0.3,
                reversed: true,
                scrollTrigger: {
                    trigger: ".ProgrammingLogos",
                    start: "top 15%",
                    end: "top 15%",
                    toggleActions: "restart none reverse none",
                },
            }
        );

        gsap.from(".MyWebsite-Title", {
            opacity: 0,
            y: "-50px",
            ease: "bounce.out",
            duration: 1,
            scrollTrigger: {
                trigger: ".MyWebsite-Title",
                start: "center 75%",
                end: "center 75%",
                toggleActions: "restart none reverse none",
            },
        });

        gsap.from(".MyWebsite-Image", {
            opacity: 0,
            height: 0,
            duration: 2,
            scrollTrigger: {
                trigger: ".MyWebsite-Image",
                start: "start 75%",
                end: "start 75%",
                toggleActions: "restart none reverse none",
            },
        });

        gsap.from(".MyWebsite-Link", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".MyWebsite-Link",
                start: "center 75%",
                end: "center 75%",
                toggleActions: "restart none reverse none",
            },
        });
    }, [welcomed]);

    return (
        <div>
            <div
                id="AboutHeading"
                className="mt-2 text-center text-4xl opacity-100 text-white ">
                About Me
            </div>
            <div
                id="AboutContent"
                className=" mt-10 text-justify text-gray-100 w-3/4 mx-auto">
                <div className="AboutContentParagraph mt-3">
                    The universe hums with a symphony of equations, a secret
                    song whispered in starlight and swirling galaxies. My ears,
                    however, are tuned to a different frequency. I, Souptik
                    Maity, am a physicist by training, a coder by exploration,
                    and an artist by hobby.
                </div>
                <div className="AboutContentParagraph mt-3">
                    My mind is a cosmic canvas, where the dance of particles
                    intertwines with the vibrant brushstrokes of digital
                    creation. Lines of code become constellations, algorithms
                    morph into melodies, and scientific theories bloom into
                    fantastical landscapes.
                </div>
                <div className="AboutContentParagraph mt-3">
                    As a physics warrior, I chase the whispers of the universe's
                    grand design. But my curiosity extends beyond the realm of
                    equations. I wield the tools of a coder, weaving digital
                    tapestries and crafting a platform{" "}
                    <a
                        href="https://www.techknowlogic.in/"
                        target="_blank"
                        className="italic text-yellow-200 underline"
                        onMouseEnter={() => {
                            setCursor("pointer");
                        }}
                        onMouseLeave={() => {
                            setCursor("normal");
                        }}>
                        Techknowlogic
                    </a>{" "}
                    to share the wonders of science with the world.
                </div>
                <div className="AboutContentParagraph mt-3">
                    When logic takes a break, my imagination takes flight. I
                    dive into the world of digital art, a realm where pixels
                    dance and colors sing. It's a playground for
                    experimentation, a space where I can express the unseen
                    through the seen.
                </div>
                <div className="AboutContentParagraph mt-3">
                    This unique blend of scientific inquiry, technical prowess,
                    and artistic vision fuels my creativity. It allows me to
                    approach challenges from a kaleidoscope of perspectives,
                    finding innovative solutions bathed in both logic and
                    wonder.
                </div>
            </div>
            <div className="w-4/5 md:w-3/4 h-96 mx-auto mt-20 relative overflow-hidden">
                <div
                    id="AboutEducationImage1"
                    className="absolute w-full h-full blur-sm">
                    <img
                        src="./Academics/PBC.jpg"
                        alt="Panskura Banamali College"
                        className=" object-cover w-full h-full"
                    />
                </div>
                <div className="absolute w-full h-full bg-black/25"></div>
                <div
                    id="AboutEducationText1"
                    className="text-center flex flex-col items-center justify-center absolute w-full h-full text-white ">
                    <div className="text-5xl">B.Sc. Physics</div>
                    <div className="text-3xl mt-4">
                        Panskura Banamali College
                    </div>
                    <div className="italic text-sm">pbconline.com</div>
                </div>
            </div>
            <div className="w-4/5 md:w-3/4 h-96 mx-auto mt-10 relative overflow-hidden">
                <div
                    id="AboutEducationImage2"
                    className="absolute w-full h-full blur-sm">
                    <img
                        src="./Academics/JU.jpg"
                        alt="Jadavpur University"
                        className=" object-cover w-full h-full"
                    />
                </div>
                <div className="absolute w-full h-full bg-black/25"></div>
                <div
                    id="AboutEducationText2"
                    className="text-center flex flex-col items-center justify-center absolute w-full h-full text-white ">
                    <div className="text-5xl">M.Sc. Physics</div>
                    <div className="text-3xl mt-4">Jadavpur University</div>
                    <div className="italic text-sm">jadavpuruniversity.in</div>
                    <div className="text-sm mt-4 text-white/50">
                        Specilization on{" "}
                        <span className="text-md text-white">Electronics</span>
                    </div>
                    <div className="text-sm text-white/50">
                        Project on{" "}
                        <span className="text-md text-white">
                            High Energy Particle Physics
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-center text-4xl text-white p-5 ProgrammingSkillsTitle">
                Programming Skills
            </div>
            <div className="mt-5 text-center flex items-center justify-evenly text-white bg-gradient-to-bl from-slate-200 to-slate-600 py-5 overflow-hidden ProgrammingSkillsTitle">
                <div className="ProgrammingLogos opacity-0">
                    <div className="w-20">
                        <img src="./ProgrammingIcons/Fortran.png" alt="" />
                    </div>
                    <div>Fortran</div>
                </div>
                <div className="ProgrammingLogos opacity-0">
                    <div className="w-20">
                        <img src="./ProgrammingIcons/Python.png" alt="" />
                    </div>
                    <div>Python</div>
                </div>
                <div className="ProgrammingLogos opacity-0">
                    <div className="w-20">
                        <img src="./ProgrammingIcons/JS.png" alt="" />
                    </div>
                    <div>Javascript</div>
                </div>
            </div>

            <div className="mt-20">
                <div className="text-center text-white text-4xl opacity-100 MyWebsite-Title">
                    My Website
                </div>
                <div className="h-32 flex items-center mt-5 ">
                    <div className="w-80 mx-auto rounded-xl overflow-hidden MyWebsite-Image">
                        <img src="./Techknowlogic.jpg" alt="techknowlogic" />
                    </div>
                </div>
                <div
                    className="w-min text-nowrap text-white bg-black/25 mx-auto mt-5 rounded-lg px-5 py-2 hover:bg-black/50 hover:scale-125 duration-500 ease-in-out MyWebsite-Link"
                    onClick={openTechknowlogic}
                    onMouseEnter={() => {
                        setCursor("pointer");
                    }}
                    onMouseLeave={() => {
                        setCursor("normal");
                    }}>
                    View
                </div>
            </div>
        </div>
    );
};

export default About;
