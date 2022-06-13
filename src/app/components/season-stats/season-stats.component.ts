import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeasonGames } from 'src/app/models/season-games';
import { SeasonStats } from 'src/app/models/season-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { SeasonStatsAddEditDialogComponent } from '../season-stats-add-edit-dialog/season-stats-add-edit-dialog.component';


@Component({
  selector: 'app-season-stats',
  templateUrl: './season-stats.component.html',
  styleUrls: ['./season-stats.component.scss']
})
export class SeasonStatsComponent implements OnInit {

  public seasonStats: SeasonStats[];

  public seasonGames: SeasonGames[];
  dataSourceSeasonGames: MatTableDataSource<SeasonGames> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public dialogRef;

  displayedColumns: string[] = [
    'gameId',
    'opponent',
    'outcome',
    'date',
    'score',
    'actions'
  ];

  constructor(
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.detroitLionsTrackerService.getGames()
      .subscribe(response => {
        this.seasonGames = response;
        this.dataSourceSeasonGames.data = response;
      });

      this.detroitLionsTrackerService.getSeasons()
      .subscribe(response => {
        this.seasonStats = response;
      });
  }

  addEditSeasonGames(input: any = new SeasonGames) {
    if (input.gameId === undefined) {
      input.gameId = 0;
    }

    const dialogRef = this.dialog.open(SeasonStatsAddEditDialogComponent, {
      minWidth: "600px",
      height: 'auto',
      disableClose: true,
      data: input
    });

    this.subscriptionList.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (input.gameId !== 0) {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.updateGames(input.gameId, result).subscribe(updateResult => {
                let updateItem = this.seasonGames.find(game => game.gameId === updateResult.gameId)
                let index = this.seasonGames.indexOf(updateItem);
                this.seasonGames[index] = updateResult;
                this.dataSourceSeasonGames.data = this.seasonGames;
              },
              ));
          } else {
            this.subscriptionList.add(
              this.detroitLionsTrackerService.createGames(result).subscribe(createResult => {
                this.seasonGames.push(createResult);
                this.dataSourceSeasonGames.data = this.seasonGames;
              },
              ));
          }
        }
      })
    );
  }

  openDeleteDialog(templateRef, item) {
    this.dialogRef = this.dialog.open(templateRef, {
      minWidth: "600px",
      height: 'auto',
      data: item,
      disableClose: true
    });
  }

  deleteSeasonGames(item) {
    this.subscriptionList.add(
      this.detroitLionsTrackerService.deleteGames(item.gameId) .subscribe(deleteResult => {
        this.seasonGames = this.seasonGames.filter(batchCode => batchCode.gameId !== item.gameId)
        this.dataSourceSeasonGames.data = this.seasonGames;
        this.dialogRef.close();
      },
      ));
  }

  public filterChanged(value: string) {
    value = value == null ? "" : value.trim().toLowerCase();
    this.dataSourceSeasonGames.filter = value;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }
}
