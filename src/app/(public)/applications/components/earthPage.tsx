"use client"
import { Box, Button } from "@mui/material"
import { useState } from "react"

import Leaflet from "./leaflet"

export default function EarthPage() {


    return (
        <Box sx={{ width: "100%", display: 'flex', justifyContent: "flex-start", alignItems: "flex-start", height: "100%", flex: 1, flexDirection: "column" }} >
            <Leaflet mapHeight="calc(100vh - 80px)" />
        </Box>
    )
}
