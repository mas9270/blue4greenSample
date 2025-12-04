"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
}

export default function AppBg() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        const generatedStars: Star[] = Array.from({ length: 200 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            speed: 5 + Math.random() * 10,
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: -1,
                background: "#000011",
            }}
        >
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "absolute",
                        top: `${star.y}%`,
                        left: `${star.x}%`,
                        width: star.size,
                        height: star.size,
                        borderRadius: "50%",
                        backgroundColor: "white",
                    }}
                    animate={{
                        y: ["-5%", "105%"],
                    }}
                    transition={{
                        duration: star.speed,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
