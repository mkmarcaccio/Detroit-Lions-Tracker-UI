import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SeasonStats } from 'src/app/models/season-stats';
import { DetroitLionsTrackerService } from 'src/services/detroit-lions-tracker.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sideNavToggle = new EventEmitter();
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

  public onToggleSideNav = () => {
    this.sideNavToggle.emit();
  }

}
