import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GameOutcomeType, SeasonGames } from 'src/app/shared/models/season-games';
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
      // Add seasonId and see if don't have to show in popup, but can auto pop in payload
      this.seasonStatsReturnObject.outcome = "";
    } else {
      this.seasonStatsReturnObject.gameId = data.gameId;
      this.seasonStatsReturnObject.seasonId = data.seasonId;
      this.seasonStatsReturnObject.opponent = data.opponent;
      this.seasonStatsReturnObject.outcome = data.outcome;
      this.seasonStatsReturnObject.date = data.date;
    }
  }

  ngOnInit(): void { }

  enableSaveButton() {
    if (this.seasonStatsReturnObject.opponent
      && this.seasonStatsReturnObject.outcome
      && this.seasonStatsReturnObject.date) {
      return true;
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
