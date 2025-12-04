'use client';

import { useEffect, useState } from "react"
import { Fixture } from "../_model/Fixture"
import { getFixturesForAWeek } from "../_service/fixtures";
import FixtureCard from "@/components/fixtureCard";

export default function TodaysFixtures(){
    
    const [fixtures, setFixtures] = useState<Fixture[]>([]);

    useEffect(() => {
        const fetchFixtures = async () => {
            const data = await getFixturesForAWeek();
            setFixtures(data);
            localStorage.setItem('fixtures', JSON.stringify(data));
        };
        fetchFixtures();
    }, []);
    
    return(
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-w-7xl">
            {fixtures.map((fixture, index) => (
                <FixtureCard key={index} fixture={fixture} index={index} />
            ))}
        </div>
    )
}