import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpecialTeamsGameStats } from 'src/app/models/special-teams-game-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { SpecialTeamsGameStatsAddEditDialogComponent } from '../special-teams-game-stats-add-edit-dialog/special-teams-game-stats-add-edit-dialog.component';

@Component({
  selector: 'app-special-teams-game-stats',
  templateUrl: './special-teams-game-stats.component.html',
  styleUrls: ['./special-teams-game-stats.component.scss']
})
export class SpecialTeamsGameStatsComponent implements OnInit {

  dataSourceSpecialTeamsGameStats: MatTableDataSource<SpecialTeamsGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public dialogRef;
  public specialTeamsGameStats: SpecialTeamsGameStats[];
  public GameId: number;

  displayedColumns: string[] = [
    'player',
    'fgAttempts',
    'fgMade',
    'xpAttempts',
    'xpMade',
    'punts',
    'puntYards',
    'kickReturns',
    'kickReturnYards',
    'puntReturns',
    'puntReturnYards',
    'touchdowns',
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

    this.detroitLionsTrackerService.getSpecialTeamsGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.specialTeamsGameStats = response;
        this.dataSourceSpecialTeamsGameStats.data = response;
      });
  }

  addEditSpecialTeamsGameStats(input: any = new SpecialTeamsGameStats) {
    if (input.playerId == undefined) {
      input.playerId = 0;
    }

    const dialogRef = this.dialog.open(SpecialTeamsGameStatsAddEditDialogComponent, {
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
              this.detroitLionsTrackerService.updateSpecialTeamsGameStats(result.gameId, result.playerId, result).subscribe(updateResult => {
                let updateItem = this.specialTeamsGameStats.find(game => game.gameId === updateResult.gameId && game.playerId === updateResult.playerId)
                let index = this.specialTeamsGameStats.indexOf(updateItem);
                this.specialTeamsGameStats[index] = updateResult;
                this.dataSourceSpecialTeamsGameStats.data = this.specialTeamsGameStats;
                this.getRefreshedGameStats();
              },
              ));

          } else {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.createSpecialTeamsGameStats(result).subscribe(createResult => {
                this.specialTeamsGameStats.push(createResult);
                this.dataSourceSpecialTeamsGameStats.data = this.specialTeamsGameStats;
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

  deleteSpecialTeamsGameStats(item) {
    this.subscriptionList.add(
      this.detroitLionsTrackerService.deleteSpecialTeamsGameStats(item.gameId, item.playerId).subscribe(deleteResult => {
        this.specialTeamsGameStats = this.specialTeamsGameStats.filter(stats => stats.gameId !== item.gameId && stats.playerId !== item.playerId)
        this.dataSourceSpecialTeamsGameStats.data = this.specialTeamsGameStats;
        this.dialogRef.close();
        this.getRefreshedGameStats();
      },
      ));
  }

  public filterChanged(value: string) {
    value = value == null ? "" : value.trim().toLowerCase();
    this.dataSourceSpecialTeamsGameStats.filter = value;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  getRefreshedGameStats() {
    this.detroitLionsTrackerService.getSpecialTeamsGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.specialTeamsGameStats = response;
        this.dataSourceSpecialTeamsGameStats.data = response;
      });
  }
}
