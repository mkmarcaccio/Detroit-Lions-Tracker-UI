import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSelectChange, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { OffensiveGameStats } from 'src/app/models/offensive-game-stats';
import { Player } from 'src/app/models/player';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { OffensiveGameStatsComponent } from '../offensive-game-stats/offensive-game-stats.component';

@Component({
  selector: 'app-offensive-game-stats-add-edit-dialog',
  templateUrl: './offensive-game-stats-add-edit-dialog.component.html',
  styleUrls: ['./offensive-game-stats-add-edit-dialog.component.scss']
})
export class OffensiveGameStatsAddEditDialogComponent implements OnInit {

  public dataSourceOffensiveGameStats: MatTableDataSource<OffensiveGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public isAdd: boolean;

  public offensiveGameStatsReturnObject: OffensiveGameStats;
  public offensiveGameStats: OffensiveGameStats[];
  public GameId: number;

  public players: Player[] = [];
  public onePlayer: Player;
  public player: number;

  public response = [];

  constructor(
    public dialogRef: MatDialogRef<OffensiveGameStatsComponent>,
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (!data.playerId) {
      this.isAdd = true;
    }

    this.offensiveGameStatsReturnObject = new OffensiveGameStats;

    if (this.isAdd) {
      this.offensiveGameStatsReturnObject.gameId = this.GameId;

    } else {
      this.offensiveGameStatsReturnObject.gameId = data.gameId;
      this.offensiveGameStatsReturnObject.playerId = data.player.playerId;
      this.offensiveGameStatsReturnObject.passingAttempts = data.passingAttempts;
      this.offensiveGameStatsReturnObject.passingCompletions = data.passingCompletions;
      this.offensiveGameStatsReturnObject.passingYards = data.passingYards;
      this.offensiveGameStatsReturnObject.passingTouchdowns = data.passingTouchdowns;
      this.offensiveGameStatsReturnObject.interceptions = data.interceptions;
      this.offensiveGameStatsReturnObject.rushingAttempts = data.rushingAttempts;
      this.offensiveGameStatsReturnObject.rushingYards = data.rushingYards;
      this.offensiveGameStatsReturnObject.rushingTouchdowns = data.rushingTouchdowns;
      this.offensiveGameStatsReturnObject.fumbles = data.fumbles;
      this.offensiveGameStatsReturnObject.receptions = data.receptions;
      this.offensiveGameStatsReturnObject.receivingYards = data.receivingYards;
      this.offensiveGameStatsReturnObject.receivingTouchdowns = data.receivingTouchdowns;
      this.offensiveGameStatsReturnObject.targets = data.targets;
      this.offensiveGameStatsReturnObject.drops = data.drops;
    }
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.GameId = params.GameId;
      })

    const offensiveStatsCall = this.detroitLionsTrackerService.getOffensiveGameStatsByGameId(this.GameId);
    const playersCall = this.detroitLionsTrackerService.getPlayers();
    const requestArray = [];
    requestArray.push(offensiveStatsCall);
    requestArray.push(playersCall);

    forkJoin(requestArray).subscribe(results => {
      this.offensiveGameStats = results[0];
      this.players = results[1];

      this.offensiveGameStatsReturnObject.gameId = this.GameId;
      this.dataSourceOffensiveGameStats.data = this.offensiveGameStats;

      this.players = this.players.filter(player => player.isOnRoster == true && player.unit == "Offense");
      this.onePlayer = this.players.find(player => player.playerId === this.offensiveGameStatsReturnObject.playerId);
      this.players = this.players.filter(player => !this.dataSourceOffensiveGameStats.data.some(d => d.playerId === player.playerId));
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
      this.offensiveGameStatsReturnObject.playerId = event.value;
    }
  }

  displayPlayerName() {
    if (this.players && this.offensiveGameStatsReturnObject) {
      let onePlayer = this.players.find(player => player.playerId === this.offensiveGameStatsReturnObject.playerId);
      return [onePlayer.firstName, onePlayer.lastName];
    }
  }
}
