import { Fixture } from "../_model/Fixture";

export async function getFixturesForAWeek(): Promise<Fixture[]> {
    try{
        const response = await fetch('http://localhost:4000/api/fixtures');
        if (!response.ok) {
            throw new Error('Failed to fetch fixtures');
        }
        const fixtures: Fixture[] = await response.json();
        return fixtures;
    } catch(error) {
        console.error('Fixtures fetch error:', error);
        return [];
    } 
}

export async function getBatchPredictions(teams: Fixture[]){
    try{
        const matches = teams.map(fixture => ({
            home_team: fixture.home_team,
            away_team: fixture.away_team
        }));

        const response = await fetch('http://localhost:4000/api/batch-predict', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matches, window: 10 }),
        })

        if (!response.ok) {
            throw new Error('Failed to get probabilities');
        }

        const result = await response.json();
        return result;

    } catch(error) {
        console.error('Batch prediction error:', error);
        return null;
    } 
}