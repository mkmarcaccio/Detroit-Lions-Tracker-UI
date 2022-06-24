import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  isAdd: boolean;

  public offensiveGameStatsReturnObject: OffensiveGameStats;

  offensiveGameStats: OffensiveGameStats[];
  dataSourceOffensiveGameStats: MatTableDataSource<OffensiveGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();

  public GameId: number;

  public onePlayer: Player;
  public players: Player[];
  public player: number;


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
    this.onePlayer = new Player;

    if (this.isAdd) {
      this.offensiveGameStatsReturnObject.gameId = this.GameId;
      this.offensiveGameStatsReturnObject.playerId = this.player;

    } else {
      this.offensiveGameStatsReturnObject.gameId = data.gameId;
      this.offensiveGameStatsReturnObject.playerId = this.player;
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
      this.offensiveGameStatsReturnObject.targets = data.targets;
      this.offensiveGameStatsReturnObject.drops = data.drops;
    }
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.GameId = params.GameId;
      })

    this.detroitLionsTrackerService.getOffensiveGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.offensiveGameStats = response;
        this.offensiveGameStatsReturnObject.gameId = this.GameId;
        this.dataSourceOffensiveGameStats.data = response;
      });

    this.detroitLionsTrackerService.getPlayers()
      .subscribe(response => {
        this.players = response
      });
  }

  enableSaveButton() {
    if (this.player) {
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
