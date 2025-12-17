import { Button } from "./ui/button";
import { Tally5 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";

interface SelectAllButtonProps {
    onSelectAll: () => void;
    disabled?: boolean;
}

export function SelectAllButton({ onSelectAll, disabled }: SelectAllButtonProps){
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        onClick={onSelectAll} 
                        disabled={disabled}
                        variant="outline"
                        size="icon"
                        className="h-14 w-14"
                    >
                        <Tally5 className="h-6 w-6"/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Select all fixtures</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 