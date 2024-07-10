"use client";

import React from "react";

const Logo = () => {
    return (
        <div className="fixed top-0 pt-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-5 bg-black/75 px-5 py-2 rounded-b-xl z-50">
            <img src="./S.jpeg" alt="logo" className="rounded-full w-10 h-10" />

            <div className="text-white text-lg duration-1000 ease-in-out hidden md:block">
                souptikmaity.com
            </div>
        </div>
    );
};

export default Logo;
