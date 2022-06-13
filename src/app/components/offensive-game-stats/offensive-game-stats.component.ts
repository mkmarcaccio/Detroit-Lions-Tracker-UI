import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OffensiveGameStats } from 'src/app/models/offensive-game-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';

@Component({
  selector: 'app-offensive-game-stats',
  templateUrl: './offensive-game-stats.component.html',
  styleUrls: ['./offensive-game-stats.component.scss']
})
export class OffensiveGameStatsComponent implements OnInit {

  public offensiveGameStats: OffensiveGameStats[];

  dataSourceOffensiveGameStats: MatTableDataSource<OffensiveGameStats> = new MatTableDataSource();
  private subscriptionList: Subscription = new Subscription();
  public dialogRef;

  public GameId: number;

  displayedColumns: string[] = [
    'playerId',
    'passingAttempts',
    'passingCompletions',
    'passingYards',
    // 'passingTouchdowns',
    // 'interceptions',
    // 'rushingAttempts',
    // 'rushingYards',
    // 'rushingTouchdowns',
    // 'fumbles',
    // 'receptions',
    // 'receivingYards',
    // 'targets',
    // 'drops'
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
    
    this.detroitLionsTrackerService.getOffensiveGameStatsByGameId(this.GameId)
      .subscribe(response => {
        this.offensiveGameStats = response;
        this.dataSourceOffensiveGameStats.data = response;
      });
  }

  public filterChanged(value: string) {
    value = value == null ? "" : value.trim().toLowerCase();
    this.dataSourceOffensiveGameStats.filter = value;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }
}
