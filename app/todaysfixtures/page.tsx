'use client';

import { useEffect, useState } from "react"
import { Fixture } from "../_model/Fixture"
import { getBatchPredictions, getFixturesForAWeek } from "../_service/fixtures";
import FixtureCard from "@/components/fixtureCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function TodaysFixtures(){
    
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [selectedMatches, setSelectedMatches] = useState<Fixture[]>([]);
    const [probabilities, setProbabilities] = useState<Map<string, any>>(new Map());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFixtures = async () => {
            setIsLoading(true);
            const data = await getFixturesForAWeek();
            setFixtures(data);
            setIsLoading(false);
        };
        fetchFixtures();
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

        const result = await getBatchPredictions(selectedMatches);
        if (result && result.predictions) {
            const newProbabilities = new Map();
            result.predictions.forEach((prediction: any) => {
                const key = `${prediction.home_team}_${prediction.away_team}`;
                newProbabilities.set(key, prediction);
            });
            setProbabilities(newProbabilities);
        }
    };

    const getProbabilityForFixture = (fixture: Fixture) => {
        const key = `${fixture.home_team}_${fixture.away_team}`;
        return probabilities.get(key);
    };

    useEffect(() => {
        console.log('Selected fixtures:', selectedMatches);
    }, [selectedMatches]);
    
    return(
        <>
            <div className="flex justify-center p-4">
                <Button onClick={handleGetProbabilities}>Get Probabilities</Button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <Spinner className="size-8" />
                </div>
            ) : (
                <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-w-7xl">
                    {fixtures.map((fixture, index) => (
                        <FixtureCard 
                        key={index} 
                        fixture={fixture} 
                        index={index}
                        isChecked={selectedMatches.includes(fixture)}
                        onCheckChange={(checked) => handleCheckChange(index, checked)}
                        probability={getProbabilityForFixture(fixture)}
                        />
                    ))}
                </div>
            )}
        </>
    )
}