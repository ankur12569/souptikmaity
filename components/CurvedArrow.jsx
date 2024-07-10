import React, { useEffect, useRef } from "react";

const CurvedArrow = ({ startX, startY, endX, endY }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const drawArrow = () => {
            const svg = svgRef.current;

            const controlPoint1X = endX;
            const controlPoint1Y = startY + 100; // Adjust this value to control the curve

            const path = `M ${startX} ${startY}
                          Q ${controlPoint1X} ${controlPoint1Y} ${endX} ${endY}`;

            svg.innerHTML = `<defs>
                                 <marker id="arrowhead" markerWidth="10.5" markerHeight="10.5" refX="5.25" refY="5.25" viewBox="0 0 10.5 10.5" orient="auto">
                             <polygon points="0,10.5 5.25,5.25 0,0 10.5,5.25" fill="#cfcfcf"/>
                         </marker>
                             </defs>
                             <path d="${path}" stroke="#cfcfcf" stroke-width="2" fill="none" stroke-dasharray="5, 5" marker-end="url(#arrowhead)" />`;
        };

        drawArrow();
        window.addEventListener("resize", drawArrow);
        return () => window.removeEventListener("resize", drawArrow);
    }, [startX, startY, endX, endY]);

    return (
        <svg
            ref={svgRef}
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
            }}></svg>
    );
};

export default CurvedArrow;
