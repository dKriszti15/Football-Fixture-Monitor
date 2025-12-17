'use client';

import { useEffect, useState } from "react"
import { Fixture } from "../_model/Fixture"
import { getBatchPredictions, getFixturesForAWeek } from "../_service/fixtures";
import FixtureCard from "@/components/fixtureCard";
import { Spinner } from "@/components/ui/spinner";
import PredictionsModal from "@/components/predictionsModal";

interface PredictionData {
    home_team: string;
    away_team: string;
    probabilities: {
        home_win: number;
        draw: number;
        away_win: number;
    };
}

export default function TodaysFixtures(){
    
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [selectedMatches, setSelectedMatches] = useState<Fixture[]>([]);
    const [probabilities, setProbabilities] = useState<Map<string, PredictionData>>(new Map());
    const [isLoading, setIsLoading] = useState(false);
    const [isPredicting, setIsPredicting] = useState(false);

    useEffect(() => {
        const fetchFixtures = async () => {
            setIsLoading(true);

            const data = await getFixturesForAWeek();
            localStorage.setItem('fixtures', JSON.stringify(data));
            localStorage.setItem('fixtures_date', new Date().toDateString());
            
            setFixtures(data);
            setIsLoading(false);
        };

        const cachedData = localStorage.getItem('fixtures');
        const cachedDate = localStorage.getItem('fixtures_date');
        const today = new Date().toDateString();

        if(cachedData && cachedDate === today){
            setFixtures(JSON.parse(cachedData));
        } else {
            fetchFixtures();
        }
    }, []);

    const handleCheckChange = (index: number, checked: boolean) => {
        setSelectedMatches(prev => {
            const fixture = fixtures[index];
            if (checked) {
                return [...prev, fixture];
            } else {
                return prev.filter(f => f !== fixture);
            }
        });
    };

    const handleGetProbabilities = async () => {
        if (selectedMatches.length === 0) {
            alert('Please select at least one fixture');
            return;
        }

        setIsPredicting(true);
        const result = await getBatchPredictions(selectedMatches);
        if (result && result.predictions) {
            const newProbabilities = new Map();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result.predictions.forEach((prediction: any) => {
                const key = `${prediction.home_team}_${prediction.away_team}`;
                newProbabilities.set(key, prediction);
            });
            setProbabilities(newProbabilities);
        }
        setIsPredicting(false);
    };

    useEffect(() => {
        console.log('Selected fixtures:', selectedMatches);
    }, [selectedMatches]);
    
    return(
        <>
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <PredictionsModal 
                    selectedMatches={selectedMatches}
                    probabilities={probabilities}
                    onGetProbabilities={handleGetProbabilities}
                    isPredicting={isPredicting}
                />
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <Spinner className="size-8" />
                </div>
            ) : fixtures.length === 0 ? (
                <div className="flex items-center justify-center min-h-[70vh]">
                    <p className="text-2xl text-muted-foreground">No upcoming matches.</p>
                </div>
            ) : (
                <div className="container mx-auto p-4 pt-22 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-w-7xl">
                    {fixtures.map((fixture, index) => (
                        <FixtureCard 
                        key={index} 
                        fixture={fixture} 
                        index={index}
                        isChecked={selectedMatches.includes(fixture)}
                        onCheckChange={(checked) => handleCheckChange(index, checked)}
                        />
                    ))}
                </div>
            )}
        </>
    )
}