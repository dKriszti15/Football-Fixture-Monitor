"use client";

import { Fixture } from "@/app/_model/Fixture";
import MyToggle from "./myToggle";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";

interface FixtureCardProps {
    fixture: Fixture;
    index?: number;
    isChecked: boolean;
    onCheckChange: (checked: boolean) => void;
    probability?: any;
}

export default function FixtureCard({ fixture, index, isChecked, onCheckChange, probability }: FixtureCardProps){
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        setFormattedDate(new Date(fixture.date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        }));
    }, [fixture.date]);

    return(
        <Card key={index}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm text-muted-foreground">
                            {formattedDate}
                        </CardTitle>
                        <Checkbox 
                            checked={isChecked}
                            onCheckedChange={onCheckChange}
                        />
                    </div>
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
                </CardContent>
        </Card>
    )
}