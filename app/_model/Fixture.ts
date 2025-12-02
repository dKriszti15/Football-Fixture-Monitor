export interface Fixture {
    date: Date;
    home_team: string;
    away_team: string;
    competition: string,
    result: number | null,
    score: number[] | string
}