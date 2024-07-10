"use client";

import React, { useState, useEffect, useRef } from "react";
import BurstingParticles from "./BurstingParticles";

const Cursor = ({ cursor }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [burstPoint, setBurstPoint] = useState(null);
    const timeoutRef = useRef(null);

    const [cursorType, setCursorType] = useState(cursor);

    // mouse move and hide function
    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setVisible(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setBurstPoint({ x: e.clientX, y: e.clientY });
            setVisible(false);
        }, 5000);
    };

    // mouse click function
    const handleMouseClick = () => {
        setCursorType("clickedCursor");
        setTimeout(() => {
            setCursorType("normal");
        }, 1000);
    };

    // handle mouse move
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleMouseClick);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleMouseClick);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    // handle cursor type
    useEffect(() => {
        setCursorType(cursor);
    }, [cursor]);

    //to get last cursor type for debugging
    useEffect(() => {
        console.log(cursorType);
    }, [cursorType]);

    return (
        <div>
            {cursorType === "pointer" && (
                <div
                    className="fixed pointer-events-none z-[60] "
                    style={{
                        top: position.y - 15,
                        left: position.x - 15,
                        opacity: visible ? 1 : 0,
                    }}>
                    <svg
                        viewBox="0 0 64 64"
                        version="1.1"
                        fill="#ffffff"
                        width={60}
                        height={60}
                        transform="matrix(-1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_iconCarrier">
                            <g
                                id="General"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd">
                                <g
                                    id="SLICES-64px"
                                    transform="translate(-810.000000, -400.000000)"></g>
                                <g
                                    id="ICONS"
                                    transform="translate(-805.000000, -395.000000)">
                                    <g transform="translate(810.000000, 402.000000)">
                                        {/* body */}
                                        <polygon
                                            id="Fill-573"
                                            fill="#CDCCD6"
                                            points="0 48 4 52 34 22 30 18"></polygon>

                                        {/* tip */}
                                        <polygon
                                            id="Fill-574"
                                            fill="#FFFFFF"
                                            points="38 10 30 18 34 22 42 14"></polygon>

                                        {/* inner shade */}
                                        <polygon
                                            id="Fill-575"
                                            fill-opacity="0.5"
                                            fill="#6C6984"
                                            points="40 12 34 18 2 50 4 52 36 20 42 14"></polygon>

                                        {/* outer body */}
                                        <polygon
                                            id="Stroke-576"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            points="4 52 0 48 38 10 42 14"></polygon>

                                        {/* tip bode seperator */}
                                        <path
                                            d="M34,22 L30,18"
                                            id="Stroke-577"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 1st strike */}
                                        <path
                                            d="M38,24 L38,28"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 2nd strike */}
                                        <path
                                            d="M43,22.6602 L45,26.1252"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 3rd strike */}
                                        <path
                                            d="M46.6602,19 L50.1252,21"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 4th strike */}
                                        <path
                                            d="M48,14 L52,14"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 5th strike */}
                                        <path
                                            d="M46.6602,9 L50.1252,7"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 6th strike */}
                                        <path
                                            d="M43,5.3398 L45,1.8748"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 7th strike */}
                                        <path
                                            d="M38,4 L38,0"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 8th strike */}
                                        <path
                                            d="M33,5.3398 L31,1.8748"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 9th strike */}
                                        <path
                                            d="M29.3398,9 L25.8748,7"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 10th strine */}
                                        <path
                                            d="M28,14 L24,14"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            )}

            {cursorType === "pointer_black" && (
                <div
                    className="fixed pointer-events-none z-[60] "
                    style={{
                        top: position.y - 15,
                        left: position.x - 15,
                        opacity: visible ? 1 : 0,
                    }}>
                    <svg
                        viewBox="0 0 64 64"
                        version="1.1"
                        fill="#ffffff"
                        width={60}
                        height={60}
                        transform="matrix(-1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_iconCarrier">
                            <g
                                id="General"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd">
                                <g
                                    id="SLICES-64px"
                                    transform="translate(-810.000000, -400.000000)"></g>
                                <g
                                    id="ICONS"
                                    transform="translate(-805.000000, -395.000000)">
                                    <g transform="translate(810.000000, 402.000000)">
                                        {/* body */}
                                        <polygon
                                            id="Fill-573"
                                            fill="#3f3d4c"
                                            points="0 48 4 52 34 22 30 18"></polygon>

                                        {/* tip */}
                                        <polygon
                                            id="Fill-574"
                                            fill="#fff"
                                            points="38 10 30 18 34 22 42 14"></polygon>

                                        {/* inner shade */}
                                        <polygon
                                            id="Fill-575"
                                            fill-opacity="0.5"
                                            fill="#000"
                                            points="40 12 34 18 2 50 4 52 36 20 42 14"></polygon>

                                        {/* outer body */}
                                        <polygon
                                            id="Stroke-576"
                                            stroke="#3f3d00"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            points="4 52 0 48 38 10 42 14"></polygon>

                                        {/* tip bode seperator */}
                                        <path
                                            d="M34,22 L30,18"
                                            id="Stroke-577"
                                            stroke="#3f3d4c"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 1st strike */}
                                        <path
                                            d="M38,24 L38,28"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 2nd strike */}
                                        <path
                                            d="M43,22.6602 L45,26.1252"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 3rd strike */}
                                        <path
                                            d="M46.6602,19 L50.1252,21"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 4th strike */}
                                        <path
                                            d="M48,14 L52,14"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 5th strike */}
                                        <path
                                            d="M46.6602,9 L50.1252,7"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 6th strike */}
                                        <path
                                            d="M43,5.3398 L45,1.8748"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 7th strike */}
                                        <path
                                            d="M38,4 L38,0"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 8th strike */}
                                        <path
                                            d="M33,5.3398 L31,1.8748"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 9th strike */}
                                        <path
                                            d="M29.3398,9 L25.8748,7"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 10th strine */}
                                        <path
                                            d="M28,14 L24,14"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            )}

            {cursorType === "normal" && (
                <div
                    className="fixed pointer-events-none z-[60]"
                    style={{
                        top: position.y - 15,
                        left: position.x - 15,
                        opacity: visible ? 1 : 0,
                    }}>
                    <svg
                        viewBox="0 0 64 64"
                        version="1.1"
                        fill="#ffffff"
                        opacity="0.75"
                        width={60}
                        height={60}
                        transform="matrix(-1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_iconCarrier">
                            <g
                                id="General"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd">
                                <g
                                    id="SLICES-64px"
                                    transform="translate(-810.000000, -400.000000)"></g>
                                <g
                                    id="ICONS"
                                    transform="translate(-805.000000, -395.000000)">
                                    <g transform="translate(810.000000, 402.000000)">
                                        {/* body */}
                                        <polygon
                                            id="Fill-573"
                                            fill="#CDCCD6"
                                            points="0 48 4 52 34 22 30 18"></polygon>

                                        {/* tip */}
                                        <polygon
                                            id="Fill-574"
                                            fill="#FFFFFF"
                                            points="38 10 30 18 34 22 42 14"></polygon>

                                        {/* inner shade */}
                                        <polygon
                                            id="Fill-575"
                                            fill-opacity="0.5"
                                            fill="#6C6984"
                                            points="40 12 34 18 2 50 4 52 36 20 42 14"></polygon>

                                        {/* outer body */}
                                        <polygon
                                            id="Stroke-576"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            points="4 52 0 48 38 10 42 14"></polygon>

                                        {/* tip bode seperator */}
                                        <path
                                            d="M34,22 L30,18"
                                            id="Stroke-577"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 1st strike */}
                                        <path
                                            d="M38,24 L38,28"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 2nd strike */}
                                        <path
                                            d="M43,22.6602 L45,26.1252"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 3rd strike */}
                                        <path
                                            d="M46.6602,19 L50.1252,21"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 4th strike */}
                                        <path
                                            d="M48,14 L52,14"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 5th strike */}
                                        <path
                                            d="M46.6602,9 L50.1252,7"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 6th strike */}
                                        <path
                                            d="M43,5.3398 L45,1.8748"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 7th strike */}
                                        <path
                                            d="M38,4 L38,0"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 8th strike */}
                                        <path
                                            d="M33,5.3398 L31,1.8748"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 9th strike */}
                                        <path
                                            d="M29.3398,9 L25.8748,7"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 10th strine */}
                                        <path
                                            d="M28,14 L24,14"
                                            stroke="#ffffff50"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            )}

            {cursorType === "clickedCursor" && (
                <div
                    className="fixed pointer-events-none z-[60] clickedCursor"
                    style={{
                        top: position.y - 15,
                        left: position.x - 15,
                        opacity: visible ? 1 : 0,
                    }}>
                    <svg
                        viewBox="0 0 64 64"
                        version="1.1"
                        fill="#ffffff"
                        width={60}
                        height={60}
                        transform="matrix(-1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_iconCarrier">
                            <g
                                id="General"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd">
                                <g
                                    id="SLICES-64px"
                                    transform="translate(-810.000000, -400.000000)"></g>
                                <g
                                    id="ICONS"
                                    transform="translate(-805.000000, -395.000000)">
                                    <g transform="translate(810.000000, 402.000000)">
                                        {/* body */}
                                        <polygon
                                            id="Fill-573"
                                            fill="#CDCCD6"
                                            points="0 48 4 52 34 22 30 18"></polygon>

                                        {/* tip */}
                                        <polygon
                                            id="Fill-574"
                                            fill="#FFFFFF"
                                            points="38 10 30 18 34 22 42 14"></polygon>

                                        {/* inner shade */}
                                        <polygon
                                            id="Fill-575"
                                            fill-opacity="0.5"
                                            fill="#6C6984"
                                            points="40 12 34 18 2 50 4 52 36 20 42 14"></polygon>

                                        {/* outer body */}
                                        <polygon
                                            id="Stroke-576"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            points="4 52 0 48 38 10 42 14"></polygon>

                                        {/* tip bode seperator */}
                                        <path
                                            d="M34,22 L30,18"
                                            id="Stroke-577"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 1st strike */}
                                        <path
                                            d="M38,24 L38,28"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 2nd strike */}
                                        <path
                                            d="M43,22.6602 L45,26.1252"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 3rd strike */}
                                        <path
                                            d="M46.6602,19 L50.1252,21"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 4th strike */}
                                        <path
                                            d="M48,14 L52,14"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 5th strike */}
                                        <path
                                            d="M46.6602,9 L50.1252,7"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 6th strike */}
                                        <path
                                            d="M43,5.3398 L45,1.8748"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 7th strike */}
                                        <path
                                            d="M38,4 L38,0"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 8th strike */}
                                        <path
                                            d="M33,5.3398 L31,1.8748"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 9th strike */}
                                        <path
                                            d="M29.3398,9 L25.8748,7"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>

                                        {/* 10th strine */}
                                        <path
                                            d="M28,14 L24,14"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            )}

            {cursorType === "none" && null}

            <div className="fixed top-0 left-0">
                <BurstingParticles point={burstPoint} />
            </div>
        </div>
    );
};

export default Cursor;
