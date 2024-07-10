import React from "react";

const QuarterCircularProgressBar = ({
    percentage,
    radius = 90,
    strokeWidth = 10,
}) => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg
            width={radius * 2}
            height={radius * 2}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
            <circle
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                stroke="#6c7481"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={0}
                transform={`rotate(-45 ${radius} ${radius})`}
                strokeLinecap="round"
                style={{
                    transformOrigin: "center center",
                    transition: "stroke-dashoffset 0.35s",
                    transform: "rotate(90deg)",
                }}
            />
            <circle
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                stroke="#283240"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-45 ${radius} ${radius})`}
                strokeLinecap="round"
                style={{
                    transformOrigin: "center center",
                    transition: "stroke-dashoffset 0.35s",
                    transform: "rotate(90deg)",
                }}
            />
        </svg>
    );
};

export default QuarterCircularProgressBar;
