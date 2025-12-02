'use client';

import { useEffect, useState } from "react"
import { Fixture } from "../_model/Fixture"
import { getFixturesForAWeek } from "../_service/fixtures";

export default function TodaysFixtures(){
    
    const [fixtures, setFixtures] = useState<Fixture[]>([]);

    useEffect(() => {
        const fetchFixtures = async () => {
            const data = await getFixturesForAWeek();
            setFixtures(data);
        };
        fetchFixtures();
    }, []);
    
    return(
        <>
            {fixtures.map((fixture, index) => (
                <div key={index}>{fixture.home_team} vs {fixture.away_team}</div>
            ))}
        </>
    )
}