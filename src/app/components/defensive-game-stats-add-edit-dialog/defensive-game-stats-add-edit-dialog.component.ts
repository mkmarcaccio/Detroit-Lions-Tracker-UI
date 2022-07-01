import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSelectChange, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { DefensiveGameStats } from 'src/app/models/defensive-game-stats';
import { Player } from 'src/app/models/player';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { DefensiveGameStatsComponent } from '../defensive-game-stats/defensive-game-stats.component';

@Component({
  selector: 'app-defensive-game-stats-add-edit-dialog',
  templateUrl: './defensive-game-stats-add-edit-dialog.component.html',
  styleUrls: ['./defensive-game-stats-add-edit-dialog.component.scss']
})
export class DefensiveGameStatsAddEditDialogComponent implements OnInit {

  public dataSourceDefensiveGameStats: MatTableDataSource<DefensiveGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public isAdd: boolean;

  public defensiveGameStatsReturnObject: DefensiveGameStats;
  public defensiveGameStats: DefensiveGameStats[];
  public GameId: number;

  public players: Player[] = [];
  public onePlayer: Player;
  public player: number;

  constructor(
    public dialogRef: MatDialogRef<DefensiveGameStatsComponent>,
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (!data.playerId) {
      this.isAdd = true;
    }

    this.defensiveGameStatsReturnObject = new DefensiveGameStats;

    if (this.isAdd) {
      this.defensiveGameStatsReturnObject.gameId = this.GameId;

    } else {
      this.defensiveGameStatsReturnObject.gameId = data.gameId;
      this.defensiveGameStatsReturnObject.playerId = data.player.playerId;
      this.defensiveGameStatsReturnObject.tackles = data.tackles;
      this.defensiveGameStatsReturnObject.tacklesForLoss = data.tacklesForLoss;
      this.defensiveGameStatsReturnObject.sacks = data.sacks;
      this.defensiveGameStatsReturnObject.forcedFumbles = data.forcedFumbles;
      this.defensiveGameStatsReturnObject.fumblesRecovered = data.fumblesRecovered;
      this.defensiveGameStatsReturnObject.interceptions = data.interceptions;
      this.defensiveGameStatsReturnObject.intYards = data.intYards;
      this.defensiveGameStatsReturnObject.passesDeflected = data.passesDeflected;
      this.defensiveGameStatsReturnObject.touchdowns = data.touchdowns;
      this.defensiveGameStatsReturnObject.safeties = data.safeties;
    }
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.GameId = params.GameId;
      })

    const defensiveStatsCall = this.detroitLionsTrackerService.getDefensiveGameStatsByGameId(this.GameId);
    const playersCall = this.detroitLionsTrackerService.getPlayers();
    const requestArray = [];
    requestArray.push(defensiveStatsCall);
    requestArray.push(playersCall);

    forkJoin(requestArray).subscribe(results => {
      this.defensiveGameStats = results[0];
      this.players = results[1];

      this.defensiveGameStatsReturnObject.gameId = this.GameId;
      this.dataSourceDefensiveGameStats.data = this.defensiveGameStats;

      this.players = this.players.filter(player => player.isOnRoster == true && player.unit == "Defense");
      this.onePlayer = this.players.find(player => player.playerId === this.defensiveGameStatsReturnObject.playerId);
      this.players = this.players.filter(player => !this.dataSourceDefensiveGameStats.data.some(d => d.playerId === player.playerId));
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
      this.defensiveGameStatsReturnObject.playerId = event.value;
    }
  }
}
