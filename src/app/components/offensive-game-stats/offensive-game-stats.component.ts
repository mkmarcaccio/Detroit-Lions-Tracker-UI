import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { OffensiveGameStats } from 'src/app/models/offensive-game-stats';
import { SeasonGames } from 'src/app/models/season-games';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { OffensiveGameStatsAddEditDialogComponent } from '../offensive-game-stats-add-edit-dialog/offensive-game-stats-add-edit-dialog.component';

@Component({
  selector: 'app-offensive-game-stats',
  templateUrl: './offensive-game-stats.component.html',
  styleUrls: ['./offensive-game-stats.component.scss']
})
export class OffensiveGameStatsComponent implements OnInit {

  dataSourceOffensiveGameStats: MatTableDataSource<OffensiveGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public dialogRef;
  public offensiveGameStats: OffensiveGameStats[];
  public GameId: number;
  public game: SeasonGames;
  public games: SeasonGames[] = [];

  displayedColumns: string[] = [
    'player',
    'passingAttempts',
    'passingCompletions',
    'passingYards',
    'passingTouchdowns',
    'interceptions',
    'rushingAttempts',
    'rushingYards',
    'rushingTouchdowns',
    'fumbles',
    'receptions',
    'receivingYards',
    'receivingTouchdowns',
    'targets',
    'drops',
    'actions'
  ];

  constructor(
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.GameId = params.GameId;
      })

    const offensiveStatsCall = this.detroitLionsTrackerService.getOffensiveGameStatsByGameId(this.GameId);
    const gameCall = this.detroitLionsTrackerService.getGames();
    const requestArray = [];
    requestArray.push(offensiveStatsCall);
    requestArray.push(gameCall);

    forkJoin(requestArray).subscribe(results => {
      this.offensiveGameStats = results[0];
      this.games = results[1];

      this.dataSourceOffensiveGameStats.data = this.offensiveGameStats;
      this.game = this.games.find(o => o.gameId == this.GameId)
    });
  }

  addEditOffensiveGameStats(input: any = new OffensiveGameStats) {
    if (input.playerId == undefined) {
      input.playerId = 0;
    }

    const dialogRef = this.dialog.open(OffensiveGameStatsAddEditDialogComponent, {
      minWidth: "auto",
      height: 'auto',
      disableClose: true,
      data: input
    });

    this.subscriptionList.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.playerId == input.playerId) {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.updateOffensiveGameStats(result.gameId, result.playerId, result).subscribe(updateResult => {
                let updateItem = this.offensiveGameStats.find(game => game.gameId === updateResult.gameId && game.playerId === updateResult.playerId)
                let index = this.offensiveGameStats.indexOf(updateItem);
                this.offensiveGameStats[index] = updateResult;
                this.dataSourceOffensiveGameStats.data = this.offensiveGameStats;
                this.getRefreshedGameStats();
              },
              ));

          } else {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.createOffensiveGameStats(result).subscribe(createResult => {
                this.offensiveGameStats.push(createResult);
                this.dataSourceOffensiveGameStats.data = this.offensiveGameStats;
                this.getRefreshedGameStats();
              },
              ));
          }
        }
      })
    );
  }

  openDeleteDialog(templateRef, item) {
    this.dialogRef = this.dialog.open(templateRef, {
      minWidth: "auto",
      height: 'auto',
      data: item,
      disableClose: true
    });
  }

  deleteOffensiveGameStats(item) {
    this.subscriptionList.add(
      this.detroitLionsTrackerService.deleteOffensiveGameStats(item.gameId, item.playerId).subscribe(deleteResult => {
        this.offensiveGameStats = this.offensiveGameStats.filter(stats => stats.gameId !== item.gameId && stats.playerId !== item.playerId)
        this.dataSourceOffensiveGameStats.data = this.offensiveGameStats;
        this.dialogRef.close();
        this.getRefreshedGameStats();
      },
      ));
  }

  public filterChanged(value: string) {
    value = value == null ? "" : value.trim().toLowerCase();
    this.dataSourceOffensiveGameStats.filter = value;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  getRefreshedGameStats() {
    this.detroitLionsTrackerService.getOffensiveGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.offensiveGameStats = response;
        this.dataSourceOffensiveGameStats.data = this.offensiveGameStats;
      });
  }
}
