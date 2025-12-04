import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export default function MyToggle(){
    return(
        <>
            <ToggleGroup type="single" className="justify-center">
                <ToggleGroupItem value="1" aria-label="Home win" className="w-16">
                    1
                </ToggleGroupItem>
                <ToggleGroupItem value="X" aria-label="Draw" className="w-16">
                    X
                </ToggleGroupItem>
                <ToggleGroupItem value="2" aria-label="Away win" className="w-16">
                    2
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    )
}