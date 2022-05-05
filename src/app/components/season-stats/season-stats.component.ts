import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SeasonStats } from 'src/app/shared/models/season-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';


@Component({
  selector: 'app-season-stats',
  templateUrl: './season-stats.component.html',
  styleUrls: ['./season-stats.component.scss']
})
export class SeasonStatsComponent implements OnInit {

  public seasonStats: SeasonStats[];
  dataSource: MatTableDataSource<SeasonStats> = new MatTableDataSource();

  displayedColumns: string[] = [
    'gameId',
    'opponent',
    'outcome',
    'date'
  ];

  constructor(
    private detroitLionsTrackerService: DetroitLionsTrackerService,
    // private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.detroitLionsTrackerService.getSeasonStats()
      .subscribe(response => {
        this.seasonStats = response;
        this.dataSource.data = response;
      });
  }
}
