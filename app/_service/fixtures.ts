import { Fixture } from "../_model/Fixture";

export async function getFixturesForAWeek(): Promise<Fixture[]> {
    try{
        const response = await fetch('http://localhost:4000/api/fixtures');
        if (!response.ok) {
            throw new Error('Failed to fetch fixtures');
        }
        const fixtures: Fixture[] = await response.json();
        console.log(fixtures);
        return fixtures;
    } catch(error) {
        console.error('Fixtures fetch error:', error);
        return [];
    } 
}