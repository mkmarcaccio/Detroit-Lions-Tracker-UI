export class SeasonGames {
    gameId: number;
    seasonId: number;
    opponent: string;
    outcome: string;
    date: Date;
    score: string;
}

export enum GameOutcomeType {
    Win = "Win",
    Loss = "Loss",
    Tie = "Tie"
}
