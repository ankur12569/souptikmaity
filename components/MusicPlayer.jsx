import React, { useState, useRef, useEffect } from "react";

const MusicPlayer = ({ src, status, cursor, setCursor }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Check if window is defined (i.e., the code is running in a browser)
        if (typeof window !== "undefined") {
            audioRef.current = new Audio(src);
            audioRef.current.loop = true; // Enable looping
        }

        // Clean up the audio element when the component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [src]);

    useEffect(() => {
        if (status) {
            setIsPlaying(true);
            fadeIn(audioRef.current, 2000);
        }
    }, [status]);

    const fadeOut = (audio, duration) => {
        const fadeOutInterval = 50;
        const fadeOutStep = audio.volume / (duration / fadeOutInterval);

        const fadeOutFunc = setInterval(() => {
            if (audio.volume > fadeOutStep) {
                audio.volume -= fadeOutStep;
            } else {
                clearInterval(fadeOutFunc);
                audio.pause();
                audio.volume = 1; // Reset volume to default for next play
            }
        }, fadeOutInterval);
    };

    const fadeIn = (audio, duration) => {
        const fadeInInterval = 50;
        const fadeInStep = 1 / (duration / fadeInInterval);
        audio.volume = 0;
        audio.play();

        const fadeInFunc = setInterval(() => {
            if (audio.volume < 1 - fadeInStep) {
                audio.volume += fadeInStep;
            } else {
                clearInterval(fadeInFunc);
                audio.volume = 1; // Ensure volume is set to max after fade in
            }
        }, fadeInInterval);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                fadeOut(audioRef.current, 1500); // 1.5 seconds fade out
            } else {
                fadeIn(audioRef.current, 1500); // 1.5 seconds fade in
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed top-0 left-0 ">
            <div
                className=" bg-gray-400 rounded-full mt-2 ml-2 p-2 hover:bg-gray-300 transition duration-500 ease-in-out"
                onClick={toggleMusic}
                onMouseEnter={() => {
                    setCursor("pointer");
                }}
                onMouseLeave={() => {
                    setCursor("normal");
                }}>
                {isPlaying ? (
                    <div className="flex gap-2">
                        <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="playing">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.4587 4.71321C11.476 4.50597 12.524 4.50597 13.5413 4.71321C16.947 5.40696 19.5666 8.08688 20.2726 11.4523C19.8627 11.2485 19.4016 11.134 18.9141 11.134C18.5532 11.134 18.1939 11.1845 17.8466 11.2841L17.578 11.3611C16.0326 11.804 14.8649 13.0899 14.5584 14.6863C14.3833 15.5982 14.3833 16.5358 14.5584 17.4477C14.8649 19.0442 16.0326 20.3301 17.578 20.773L17.8466 20.85C18.1939 20.9495 18.5532 21 18.9141 21C20.6184 21 22 19.6011 22 17.8754L22 12.9248L21.9757 12.566C21.6624 7.94133 18.3328 4.10026 13.8447 3.18603C12.6271 2.93799 11.3729 2.93799 10.1553 3.18603C5.66717 4.10026 2.33756 7.94133 2.0243 12.566L2 12.9248L2.00001 17.8754C2 19.6011 3.38158 21 5.08586 21C5.44684 21 5.80608 20.9495 6.15342 20.85L6.42199 20.773C7.96742 20.3301 9.13514 19.0442 9.44163 17.4477C9.6167 16.5358 9.6167 15.5982 9.44163 14.6863C9.13514 13.0899 7.96743 11.804 6.42199 11.3611L6.15342 11.2841C5.80609 11.1845 5.44684 11.134 5.08586 11.134C4.5984 11.134 4.13733 11.2485 3.72744 11.4523C4.4334 8.08687 7.05297 5.40696 10.4587 4.71321Z"
                                fill="#363853"
                            />
                        </svg>
                    </div>
                ) : (
                    <div>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicPlayer;
