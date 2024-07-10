import React, { useState, useEffect } from "react";

const TypewriterEffect = ({
    words,
    shouldStart = false,
    typingSpeed = 200,
    deletingSpeed = 150,
    delay = 1000,
    initialDelay = 500,
    onWordStart,
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const [wordStartCalled, setWordStartCalled] = useState(false);

    useEffect(() => {
        if (!shouldStart || words.length === 0) return;

        if (!hasStarted) {
            const initialTimeout = setTimeout(
                () => setHasStarted(true),
                initialDelay
            );
            return () => clearTimeout(initialTimeout);
        }

        const handleTyping = () => {
            const currentWordObj = words[currentWordIndex];
            const currentWord = currentWordObj.word;

            if (isDeleting) {
                setText(currentWord.substring(0, currentLetterIndex - 1));
                setCurrentLetterIndex((prev) => prev - 1);

                if (currentLetterIndex === 0) {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => {
                        const nextIndex = (prev + 1) % words.length;
                        setWordStartCalled(false);
                        return nextIndex;
                    });
                }
            } else {
                setText(currentWord.substring(0, currentLetterIndex + 1));
                setCurrentLetterIndex((prev) => prev + 1);

                if (
                    !wordStartCalled &&
                    currentLetterIndex === 0 &&
                    onWordStart
                ) {
                    onWordStart(currentWordObj);
                    setWordStartCalled(true);
                }

                if (currentLetterIndex === currentWord.length) {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            }
        };

        const typingTimeout = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(typingTimeout);
    }, [
        currentLetterIndex,
        isDeleting,
        currentWordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        delay,
        initialDelay,
        hasStarted,
        onWordStart,
        wordStartCalled,
        shouldStart,
    ]);

    if (words.length === 0) return null;

    const currentWordObj = words[currentWordIndex];
    const textColorClass = currentWordObj.colorClass;
    const fontClass = currentWordObj.fontClass;

    return (
        <div>
            <span className={`${textColorClass} ${fontClass}`}>{text}</span>
            <span
                className={`cursor  ${
                    hasStarted ? `${textColorClass}` : "text-white"
                }`}>
                &#9632;
            </span>
        </div>
    );
};

export default TypewriterEffect;
