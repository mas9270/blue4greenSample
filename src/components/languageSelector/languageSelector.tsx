"use cliet"

import { Select, MenuItem } from "@mui/material";
import { useLanguageStore } from "@/hooks/useLanguageStore";

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguageStore()

    return (
        <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            size="small"
            sx={{ minWidth: 50 }}
        >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="de">DE</MenuItem>
        </Select>
    );
}
