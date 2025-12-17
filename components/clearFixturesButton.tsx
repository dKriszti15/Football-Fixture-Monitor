import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";

interface ClearFixturesButtonProps {
    onClear: () => void;
    disabled?: boolean;
}

export function ClearFixturesButton({ onClear, disabled }: ClearFixturesButtonProps){
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        onClick={onClear} 
                        disabled={disabled}
                        variant="destructive"
                        size="icon"
                        className="h-14 w-14"
                    >
                        <X className="h-6 w-6"/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Clear selected fixtures</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 