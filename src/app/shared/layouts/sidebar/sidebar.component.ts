import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SeasonStats } from 'src/app/models/season-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public seasonStats: SeasonStats[];
  public oneSeason: SeasonStats;
  public SeasonId: number;

  constructor(
    private detroitLionsTrackerService: DetroitLionsTrackerService
  ) { }

  ngOnInit() {

    const seasonsCall = this.detroitLionsTrackerService.getSeasons();
    const requestArray = [];
    requestArray.push(seasonsCall);

    forkJoin(requestArray).subscribe(results => {
      this.seasonStats = results[0];

      this.oneSeason = this.seasonStats[0];
      this.SeasonId = this.oneSeason.seasonId;
    });
  }

}
