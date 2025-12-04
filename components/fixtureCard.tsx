import { Fixture } from "@/app/_model/Fixture";
import MyToggle from "./myToggle";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FixtureCardProps {
    fixture: Fixture;
    index?: number;
}

export default function FixtureCard({ fixture, index }: FixtureCardProps){
    return(
        <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">
                        {new Date(fixture.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-lg flex-1 text-right">{fixture.home_team}</div>
                        <div className="text-sm text-muted-foreground">vs</div>
                        <div className="font-semibold text-lg flex-1 text-left">{fixture.away_team}</div>
                    </div>
                    <div className="flex justify-center">
                        <MyToggle/>
                    </div>
                </CardContent>
        </Card>
    )
}