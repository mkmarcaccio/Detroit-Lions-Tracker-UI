import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { GameOutcomeType, SeasonGames } from 'src/app/shared/models/season-games';
import { SeasonStats } from 'src/app/shared/models/season-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';
import { SeasonStatsComponent } from '../season-stats/season-stats.component';

@Component({
  selector: 'app-season-stats-add-edit-dialog',
  templateUrl: './season-stats-add-edit-dialog.component.html',
  styleUrls: ['./season-stats-add-edit-dialog.component.scss']
})
export class SeasonStatsAddEditDialogComponent implements OnInit {
  isAdd: boolean;

  seasonStatsReturnObject: SeasonGames;
  
  seasonStats: SeasonStats[];
  dataSourceSeasonStats: MatTableDataSource<SeasonStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();

  types: GameOutcomeType[] = [
    GameOutcomeType.Win,
    GameOutcomeType.Loss,
    GameOutcomeType.Tie
  ];

  currentType: GameOutcomeType[];


  constructor(
    public dialogRef: MatDialogRef<SeasonStatsComponent>,
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.isAdd = data.gameId === 0;
    this.currentType = this.data.type;
    this.seasonStatsReturnObject = new SeasonGames;
    if (this.isAdd) {
      this.seasonStatsReturnObject.gameId = 0;
      this.seasonStatsReturnObject.outcome = "";
    } else {
      this.seasonStatsReturnObject.gameId = data.gameId;
      this.seasonStatsReturnObject.seasonId = data.seasonId;
      this.seasonStatsReturnObject.opponent = data.opponent;
      this.seasonStatsReturnObject.outcome = data.outcome;
      this.seasonStatsReturnObject.date = data.date;
      this.seasonStatsReturnObject.score = data.score;
    }
  }
      

  ngOnInit(): void {
    this.detroitLionsTrackerService.getSeasons()
    .subscribe(response => {
      this.seasonStats = response;
      this.seasonStatsReturnObject.seasonId = response[0].seasonId
      this.dataSourceSeasonStats.data = response;
    });
   }


  enableSaveButton() {
    if (this.seasonStatsReturnObject.opponent
      && this.seasonStatsReturnObject.outcome
      && this.seasonStatsReturnObject.date
      && this.seasonStatsReturnObject.score) {
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
