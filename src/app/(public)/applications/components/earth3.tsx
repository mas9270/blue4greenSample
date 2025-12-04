"use client";
import Globe, { GlobeMethods } from "react-globe.gl";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as THREE from "three";

export default function Earth3() {
    return (
        <Box>
            <EarthBackground />
        </Box>
    );
}

function EarthBackground() {
    const globeRef = useRef<any>(null);
    const [scrollY, setScrollY] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const starsRef = useRef<THREE.Points | null>(null);

    // اندازه صفحه
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // مقدار اسکرول
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // چرخش زمین وابسته به اسکرول
    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.pointOfView({ lat: 0, lng: scrollY * 0.05, altitude: 2 });
        }
    }, [scrollY]);

    // ایجاد ستاره‌ها
    const createStars = () => {
        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 3000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
        }
        starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.5,
            sizeAttenuation: true,
        });
        return new THREE.Points(starsGeometry, starsMaterial);
    };

    // حرکت ستاره‌ها
    useEffect(() => {
        const animateStars = () => {
            if (starsRef.current) {
                const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 2] += 0.3; // سرعت حرکت ستاره‌ها
                    if (positions[i + 2] > 1500) positions[i + 2] = -1500;
                }
                starsRef.current.geometry.attributes.position.needsUpdate = true;
            }
            requestAnimationFrame(animateStars);
        };
        animateStars();
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: -1,
                overflow: "hidden",
            }}
        >
            {/* Three.js Canvas برای ستاره‌ها */}
            <canvas
                ref={(canvas) => {
                    if (!canvas) return;
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
                    camera.position.z = 1000;

                    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);

                    const stars = createStars();
                    starsRef.current = stars;
                    scene.add(stars);

                    const animate = () => {
                        requestAnimationFrame(animate);
                        renderer.render(scene, camera);
                    };
                    animate();
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />

            {/* Globe */}
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                enablePointerInteraction={false}
            />
        </Box>
    );
}
