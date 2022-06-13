export class Player {
    playerId: number;
    firstName: string;
    lastName: string;
    position: string;
    unit: PlayerUnit;
    jerseyNumber: number;
    depthChartOrder: number;
    IsOnRoster: boolean;
}

export enum PlayerUnit {
    Offense = "Offense",
    Defense = "Defense",
    SpecialTeams = "SpecialTeams"
}
