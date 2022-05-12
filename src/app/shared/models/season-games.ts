export class SeasonGames {
    gameId: number;
    seasonId: number;
    opponent: string;
    outcome: string;
    date: Date;
}

export enum GameOutcomeType {
    Win = "Win",
    Loss = "Loss",
    Tie = "Tie"
}