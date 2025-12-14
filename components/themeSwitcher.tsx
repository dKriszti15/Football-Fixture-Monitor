"use client";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme/themeContext";

export default function ThemeSwitcher(){
    const {theme, switchTheme} = useContext(ThemeContext);
    return(
        <> 
            <Tooltip>
            <TooltipTrigger asChild>
                <Button className="h-14 w-14" onClick={switchTheme}>
                    {theme == 'light' ? (<LightModeOutlinedIcon/>) : (<DarkModeOutlinedIcon/>)}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Switch to {theme == 'light' ? 'dark' : 'light'} theme.</p>
            </TooltipContent>
            </Tooltip>
        </>
    )
}