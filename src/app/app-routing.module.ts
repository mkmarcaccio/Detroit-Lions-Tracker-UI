import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';
import { SeasonStatsComponent } from './components/season-stats/season-stats.component';
import { OffensiveGameStatsComponent } from './components/offensive-game-stats/offensive-game-stats.component';
import { DefensiveGameStatsComponent } from './components/defensive-game-stats/defensive-game-stats.component';
import { SpecialTeamsGameStatsComponent } from './components/special-teams-game-stats/special-teams-game-stats.component';
import { PlayersComponent } from './components/players/players.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'season-stats'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'season-stats',
        component: SeasonStatsComponent
      }
    ]
  },
  {
    path: 'game-stats',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        outlet: 'Offense',
        component: OffensiveGameStatsComponent
      },
      {
        path: '',
        outlet: 'Defense',
        component: DefensiveGameStatsComponent
      },
      {
        path: '',
        outlet: 'Special',
        component: SpecialTeamsGameStatsComponent
      }
    ]
  },
  {
    path: 'roster',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: PlayersComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }