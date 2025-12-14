"use client";
import { Fixture } from "@/app/_model/Fixture";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import MyToggle from "./myToggle";
import { Spinner } from "./ui/spinner";

interface PredictionData {
    home_team: string;
    away_team: string;
    probabilities: {
        home_win: number;
        draw: number;
        away_win: number;
    };
}

interface PredictionsModalProps {
    selectedMatches: Fixture[];
    probabilities: Map<string, PredictionData>;
    onGetProbabilities: () => void;
    isPredicting: boolean;
}

export default function PredictionsModal({ selectedMatches, probabilities, onGetProbabilities, isPredicting }: PredictionsModalProps){
    const getProbabilityForFixture = (fixture: Fixture) => {
        const key = `${fixture.home_team}_${fixture.away_team}`;
        return probabilities.get(key);
    };

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={selectedMatches.length === 0} className="text-lg px-5 py-5">
                    View Selected ({selectedMatches.length})
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Selected: {selectedMatches.length} fixture{selectedMatches.length !== 1 ? 's' : ''}</DialogTitle>
                </DialogHeader>
                {isPredicting ? (
                    <div className="flex justify-center items-center py-8">
                        <Spinner className="size-8" />
                    </div>
                ) : (
                    <div className="space-y-4 py-4">
                    {selectedMatches.map((fixture, index) => {
                        const probability = getProbabilityForFixture(fixture);
                        return (
                            <div key={index} className="border rounded-lg p-4 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="font-semibold flex-1 text-right">{fixture.home_team}</div>
                                    <div className="text-sm text-muted-foreground">vs</div>
                                    <div className="font-semibold flex-1 text-left">{fixture.away_team}</div>
                                </div>
                                <div className="flex justify-center">
                                    <MyToggle />
                                </div>
                                {probability && (
                                    <div className="flex justify-center gap-6 text-sm mt-2">
                                        <div className="text-center">
                                            <div className="text-muted-foreground">
                                                {(probability.probabilities.home_win * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-muted-foreground">
                                                {(probability.probabilities.draw * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-muted-foreground">
                                                {(probability.probabilities.away_win * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    </div>
                )}
                <DialogFooter className="flex gap-2">
                    <Button onClick={onGetProbabilities} disabled={selectedMatches.length === 0 || isPredicting}>
                        {isPredicting ? 'Loading...' : 'Get Probabilities'}
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}