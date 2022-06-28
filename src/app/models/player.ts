export class Player {
    playerId: number;
    firstName: string;
    lastName: string;
    position: string;
    unit: string;
    jerseyNumber: number;
    depthChartOrder: number;
    isOnRoster: boolean;
}

export enum PlayerUnit {
    Offense = "Offense",
    Defense = "Defense",
    SpecialTeams = "SpecialTeams"
}

export enum PlayerPositions {
    QB = "QB",
    RB = "RB",
    FB = "FB",
    TE = "TE",
    WR = "WR",
    DT = "DT",
    DE = "DE",
    LB = "LB",
    CB = "CB",
    S = "S",
    K = "K",
    P = "P"
}
