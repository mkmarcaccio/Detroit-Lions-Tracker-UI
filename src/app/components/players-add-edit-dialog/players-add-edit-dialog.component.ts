import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player, PlayerPositions, PlayerUnit } from 'src/app/models/player';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';

@Component({
  selector: 'app-players-add-edit-dialog',
  templateUrl: './players-add-edit-dialog.component.html',
  styleUrls: ['./players-add-edit-dialog.component.scss']
})
export class PlayersAddEditDialogComponent implements OnInit {

  public dataSourcePlayers: MatTableDataSource<Player> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public isAdd: boolean;

  public playersReturnObject: Player;
  public players: Player[];
  public playerId: number;

  public currentUnit: PlayerUnit[];
  public units: PlayerUnit[] = [
    PlayerUnit.Offense,
    PlayerUnit.Defense,
    PlayerUnit.SpecialTeams
  ];

  public currentPosition: PlayerPositions[];
  public positions: PlayerPositions[] = [
    PlayerPositions.QB,
    PlayerPositions.RB,
    PlayerPositions.FB,
    PlayerPositions.TE,
    PlayerPositions.WR,
    PlayerPositions.DT,
    PlayerPositions.DE,
    PlayerPositions.LB,
    PlayerPositions.CB,
    PlayerPositions.S,
    PlayerPositions.K,
    PlayerPositions.P
  ];

  constructor(
    public dialogRef: MatDialogRef<Player>,
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (!data.playerId) {
      this.isAdd = true;
    }

    this.playersReturnObject = new Player;
    this.currentUnit = this.data.unit;
    this.currentPosition = this.data.position;

    if (this.isAdd) {
      this.playersReturnObject.playerId = 0;
      this.playersReturnObject.unit = "";
      this.playersReturnObject.position = "";

    } else {
      this.playersReturnObject.playerId = data.playerId;
      this.playersReturnObject.jerseyNumber = data.jerseyNumber;
      this.playersReturnObject.firstName = data.firstName;
      this.playersReturnObject.lastName = data.lastName;
      this.playersReturnObject.position = data.position;
      this.playersReturnObject.unit = data.unit;
      this.playersReturnObject.depthChartOrder = data.depthChartOrder;
      this.playersReturnObject.isOnRoster = data.isOnRoster;
    }
  }

  ngOnInit(): void {
    this.detroitLionsTrackerService.getPlayers()
      .subscribe(response => {
        this.players = response;
        this.players = this.players.filter(player => player.isOnRoster == true)
        this.dataSourcePlayers.data = this.players;
      });
  }

  enableSaveButton() {
    if (this.playersReturnObject.jerseyNumber
      && this.playersReturnObject.firstName
      && this.playersReturnObject.lastName
      && this.playersReturnObject.position
      && this.playersReturnObject.unit
      && this.playersReturnObject.depthChartOrder) {
      return true;
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }
}
