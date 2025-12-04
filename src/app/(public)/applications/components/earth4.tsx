"use client";

import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import * as satellite from "satellite.js";

const EARTH_RADIUS_KM = 6371;
const TIME_STEP = 3000;
const TLE_URL = "/datasets/space-track-leo.txt";

interface SatelliteData {
    satrec: satellite.SatRec;
    name: string;
    lat?: number;
    lng?: number;
    alt?: number;
}

const Earth4: React.FC = () => {
    const globeRef = useRef<HTMLDivElement>(null);
    const globeInstance = useRef<any>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        // اطمینان از اندازه کامل صفحه
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";

        // ایجاد Globe
        globeInstance.current = new Globe(globeRef.current)
            .globeImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg")
            .particleLat("lat")
            .particleLng("lng")
            .particleAltitude("alt")
            .particlesColor(() => "palegreen");

        // غیر فعال کردن کنترل کاربر و چرخش ثابت
        const controls = globeInstance.current.controls();
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;

        // کاهش مقدار altitude → کره بزرگتر دیده می‌شود
        globeInstance.current.pointOfView({ altitude: 2.5 });

        let satellites: SatelliteData[] = [];
        let currentTime = new Date();

        const loadTLE = async () => {
            try {
                const res = await fetch(TLE_URL);
                const rawData = await res.text();
                const tleLines = rawData
                    .replace(/\r/g, "")
                    .split(/\n(?=[^12])/)
                    .filter(Boolean)
                    .map((tle) => tle.split("\n"));

                satellites = tleLines
                    .map(([name, ...tle]) => {
                        if (tle.length < 2) return null;
                        const [line1, line2] = tle;
                        return {
                            satrec: satellite.twoline2satrec(line1, line2),
                            name: name?.trim().replace(/^0 /, ""),
                        };
                    })
                    .filter((s): s is SatelliteData => s !== null)
                    .filter((s) => !!satellite.propagate(s.satrec, new Date())?.position);
            } catch (err) {
                console.error("Failed to load TLE:", err);
            }
        };

        loadTLE();

        const animate = () => {
            requestAnimationFrame(animate);

            currentTime = new Date(+currentTime + TIME_STEP);
            const gmst = satellite.gstime(currentTime);
            satellites.forEach((s) => {
                const eci = satellite.propagate(s.satrec, currentTime);
                if (eci?.position) {
                    const gdPos = satellite.eciToGeodetic(eci.position, gmst);
                    s.lat = satellite.radiansToDegrees(gdPos.latitude);
                    s.lng = satellite.radiansToDegrees(gdPos.longitude);
                    s.alt = gdPos.height / EARTH_RADIUS_KM;
                } else {
                    s.lat = NaN;
                    s.lng = NaN;
                    s.alt = NaN;
                }
            });

            globeInstance.current.particlesData(
                satellites.filter((s) => !isNaN(s.lat!) && !isNaN(s.lng!) && !isNaN(s.alt!))
            );
        };

        animate();
    }, []);

    return (
        <div
            ref={globeRef}
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        />
    );
};

export default Earth4;
