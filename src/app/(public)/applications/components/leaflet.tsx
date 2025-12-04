"use client";
import {
    MapContainer,
    TileLayer,
    Circle,
    CircleMarker,
    Polyline,
    Polygon,
    Rectangle,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { Box, FormControlLabel, Switch, Typography, Paper, Stack } from "@mui/material";
import "leaflet/dist/leaflet.css";

type Tool = "circle" | "circleMarker" | "polyline" | "polygon" | "rectangle" | "marker";

interface ShapeData {
    circle: { center: [number, number]; radius: number }[];
    circleMarker: { center: [number, number]; radius: number }[];
    polyline: [number, number][][];
    polygon: [number, number][][];
    rectangle: [[number, number], [number, number]][];
    marker: [number, number][];
}

interface MapWithToolsProps {
    mapHeight?: number | string; // ارتفاع نقشه
}

const DrawingLayer: React.FC<{ activeTool: Tool; addShape: (tool: Tool, data: any) => void }> = ({
    activeTool,
    addShape,
}) => {
    const [tempPoints, setTempPoints] = useState<[number, number][]>([]);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;

            switch (activeTool) {
                case "circle":
                    addShape("circle", { center: [lat, lng], radius: 200 });
                    break;
                case "circleMarker":
                    addShape("circleMarker", { center: [lat, lng], radius: 20 });
                    break;
                case "marker":
                    addShape("marker", [lat, lng]);
                    break;
                case "polyline":
                case "polygon":
                    setTempPoints((prev) => [...prev, [lat, lng]]);
                    break;
                case "rectangle":
                    if (tempPoints.length === 0) {
                        setTempPoints([[lat, lng]]);
                    } else if (tempPoints.length === 1) {
                        setTempPoints((prev) => [...prev, [lat, lng]]);
                        addShape("rectangle", [tempPoints[0], [lat, lng]]);
                        setTempPoints([]);
                    }
                    break;
            }
        },
        dblclick() {
            if ((activeTool === "polyline" || activeTool === "polygon") && tempPoints.length > 1) {
                addShape(activeTool, tempPoints);
                setTempPoints([]);
            }
        },
    });

    return (
        <>
            {(activeTool === "polyline" && tempPoints.length > 0) && (
                <Polyline positions={tempPoints} pathOptions={{ color: "lime" }} />
            )}
            {(activeTool === "polygon" && tempPoints.length > 0) && (
                <Polygon positions={tempPoints} pathOptions={{ color: "purple" }} />
            )}
        </>
    );
};

export default function Leaflet({ mapHeight = 600 }: MapWithToolsProps) {
    const [activeTool, setActiveTool] = useState<Tool | null>(null);
    const [shapes, setShapes] = useState<ShapeData>({
        circle: [],
        circleMarker: [],
        polyline: [],
        polygon: [],
        rectangle: [],
        marker: [],
    });

    const addShape = (tool: Tool, data: any) => {
        setShapes((prev) => ({
            ...prev,
            [tool]: [...prev[tool], data],
        }));
    };

    return (
        <Box sx={{ width: "100%", position: "relative" }}>
            {/* جعبه ابزار افقی */}
            <Paper
                elevation={3}

                sx={{
                    position: "absolute",
                    top: 10,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: 1,
                    display: "flex",
                    justifyContent :"center",
                    gap: 1,
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    mx: 8
                }}
            >
                
                <Typography variant="subtitle2" sx={{ mr: 2 }}>
                    Select Active Tool:
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    {["circle", "circleMarker", "polyline", "polygon", "rectangle", "marker"].map((tool) => (
                        <FormControlLabel
                            key={tool}
                            control={
                                <Switch
                                    checked={activeTool === tool}
                                    onChange={() => setActiveTool(activeTool === tool ? null : (tool as Tool))}
                                    size="small"
                                />
                            }
                            label={tool.charAt(0).toUpperCase() + tool.slice(1)}
                        />
                    ))}
                </Stack>
            </Paper>

            {/* نقشه */}
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: mapHeight, width: "100%" }}
                worldCopyJump
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* نمایش اشکال */}
                {shapes.circle.map((c, idx) => (
                    <Circle key={idx} center={c.center} radius={c.radius} pathOptions={{ color: "blue" }} />
                ))}
                {shapes.circleMarker.map((c, idx) => (
                    <CircleMarker key={idx} center={c.center} radius={c.radius} pathOptions={{ color: "red" }}>
                        <Popup>CircleMarker</Popup>
                    </CircleMarker>
                ))}
                {shapes.polyline.map((p, idx) => (
                    <Polyline key={idx} positions={p} pathOptions={{ color: "lime" }} />
                ))}
                {shapes.polygon.map((p, idx) => (
                    <Polygon key={idx} positions={p} pathOptions={{ color: "purple" }} />
                ))}
                {shapes.rectangle.map((r, idx) => (
                    <Rectangle key={idx} bounds={r} pathOptions={{ color: "black" }} />
                ))}
                {shapes.marker.map((m, idx) => (
                    <Marker key={idx} position={m}>
                        <Popup>Marker</Popup>
                    </Marker>
                ))}

                {/* لایه رسم ابزار فعال */}
                {activeTool && <DrawingLayer activeTool={activeTool} addShape={addShape} />}
            </MapContainer>
        </Box>
    );
}
