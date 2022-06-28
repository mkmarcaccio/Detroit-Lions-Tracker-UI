import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DefensiveGameStats } from 'src/app/models/defensive-game-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { DefensiveGameStatsAddEditDialogComponent } from '../defensive-game-stats-add-edit-dialog/defensive-game-stats-add-edit-dialog.component';

@Component({
  selector: 'app-defensive-game-stats',
  templateUrl: './defensive-game-stats.component.html',
  styleUrls: ['./defensive-game-stats.component.scss']
})
export class DefensiveGameStatsComponent implements OnInit {

  dataSourceDefensiveGameStats: MatTableDataSource<DefensiveGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public dialogRef;
  public defensiveGameStats: DefensiveGameStats[];
  public GameId: number;

  displayedColumns: string[] = [
    'player',
    'tackles',
    'tacklesForLoss',
    'sacks',
    'forcedFumbles',
    'fumblesRecovered',
    'interceptions',
    'intYards',
    'passesDeflected',
    'touchdowns',
    'safeties',
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

    this.detroitLionsTrackerService.getDefensiveGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.defensiveGameStats = response;
        this.dataSourceDefensiveGameStats.data = response;
      });
  }

  addEditDefensiveGameStats(input: any = new DefensiveGameStats) {
    if (input.playerId == undefined) {
      input.playerId = 0;
    }

    const dialogRef = this.dialog.open(DefensiveGameStatsAddEditDialogComponent, {
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
              this.detroitLionsTrackerService.updateDefensiveGameStats(result.gameId, result.playerId, result).subscribe(updateResult => {
                let updateItem = this.defensiveGameStats.find(game => game.gameId === updateResult.gameId && game.playerId === updateResult.playerId)
                let index = this.defensiveGameStats.indexOf(updateItem);
                this.defensiveGameStats[index] = updateResult;
                this.dataSourceDefensiveGameStats.data = this.defensiveGameStats;
                this.getRefreshedGameStats();
              },
              ));

          } else {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.createDefensiveGameStats(result).subscribe(createResult => {
                this.defensiveGameStats.push(createResult);
                this.dataSourceDefensiveGameStats.data = this.defensiveGameStats;
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

  deleteDefensiveGameStats(item) {
    this.subscriptionList.add(
      this.detroitLionsTrackerService.deleteDefensiveGameStats(item.gameId, item.playerId).subscribe(deleteResult => {
        this.defensiveGameStats = this.defensiveGameStats.filter(stats => stats.gameId !== item.gameId && stats.playerId !== item.playerId)
        this.dataSourceDefensiveGameStats.data = this.defensiveGameStats;
        this.dialogRef.close();
        this.getRefreshedGameStats();
      },
      ));
  }

  public filterChanged(value: string) {
    value = value == null ? "" : value.trim().toLowerCase();
    this.dataSourceDefensiveGameStats.filter = value;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  getRefreshedGameStats() {
    this.detroitLionsTrackerService.getDefensiveGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.defensiveGameStats = response;
        this.dataSourceDefensiveGameStats.data = response;
      });
  }
}
