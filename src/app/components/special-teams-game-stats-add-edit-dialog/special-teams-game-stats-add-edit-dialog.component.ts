import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSelectChange, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { SpecialTeamsGameStats } from 'src/app/models/special-teams-game-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';

@Component({
  selector: 'app-special-teams-game-stats-add-edit-dialog',
  templateUrl: './special-teams-game-stats-add-edit-dialog.component.html',
  styleUrls: ['./special-teams-game-stats-add-edit-dialog.component.scss']
})
export class SpecialTeamsGameStatsAddEditDialogComponent implements OnInit {

  public dataSourceSpecialTeamsGameStats: MatTableDataSource<SpecialTeamsGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public isAdd: boolean;

  public specialTeamsGameStatsReturnObject: SpecialTeamsGameStats;
  public specialTeamsGameStats: SpecialTeamsGameStats[];
  public GameId: number;

  public players: Player[] = [];
  public onePlayer: Player;
  public player: number;

  constructor(
    public dialogRef: MatDialogRef<SpecialTeamsGameStats>,
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    if (!data.playerId) {
      this.isAdd = true;
    }

    this.specialTeamsGameStatsReturnObject = new SpecialTeamsGameStats;

    if (this.isAdd) {
      this.specialTeamsGameStatsReturnObject.gameId = this.GameId;

    } else {
      this.specialTeamsGameStatsReturnObject.gameId = data.gameId;
      this.specialTeamsGameStatsReturnObject.playerId = data.player.playerId;
      this.specialTeamsGameStatsReturnObject.fgAttempts = data.fGAttempts;
      this.specialTeamsGameStatsReturnObject.fgMade = data.fGMade;
      this.specialTeamsGameStatsReturnObject.xpAttempts = data.xPAttempts;
      this.specialTeamsGameStatsReturnObject.xpMade = data.xPMade;
      this.specialTeamsGameStatsReturnObject.punts = data.punts;
      this.specialTeamsGameStatsReturnObject.puntYards = data.puntYards;
      this.specialTeamsGameStatsReturnObject.kickReturns = data.kickReturns;
      this.specialTeamsGameStatsReturnObject.kickReturnYards = data.kickReturnYards;
      this.specialTeamsGameStatsReturnObject.puntReturns = data.puntReturns;
      this.specialTeamsGameStatsReturnObject.puntReturnYards = data.puntReturnYards;
      this.specialTeamsGameStatsReturnObject.touchdowns = data.touchdowns;
    }
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.GameId = params.GameId;
      })

    this.detroitLionsTrackerService.getSpecialTeamsGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.specialTeamsGameStats = response;
        this.specialTeamsGameStatsReturnObject.gameId = this.GameId;
        this.dataSourceSpecialTeamsGameStats.data = response;
      });

    this.detroitLionsTrackerService.getPlayers()
      .subscribe(response => {
        this.players = response
        this.onePlayer = this.players.find(player => player.playerId === this.specialTeamsGameStatsReturnObject.playerId);
      });
  }

  enableSaveButton() {
    if (this.isAdd && this.player) {
      return true;
    }
    if (!this.isAdd) {
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

  onPlayerChange(event: MatSelectChange) {
    if (this.isAdd) {
      this.specialTeamsGameStatsReturnObject.playerId = event.value;
    }
  }

  displayPlayerName() {
    if (this.players && this.specialTeamsGameStatsReturnObject) {
      let onePlayer = this.players.find(player => player.playerId === this.specialTeamsGameStatsReturnObject.playerId);
      return [onePlayer.firstName, onePlayer.lastName];
    }
  }
}
