import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SeasonStatsComponent } from './components/season-stats/season-stats.component';
import { SeasonStatsAddEditDialogComponent } from './components/season-stats-add-edit-dialog/season-stats-add-edit-dialog.component';
import { OffensiveGameStatsComponent } from './components/offensive-game-stats/offensive-game-stats.component';
import { DefensiveGameStatsComponent } from './components/defensive-game-stats/defensive-game-stats.component';
import { SpecialTeamsGameStatsComponent } from './components/special-teams-game-stats/special-teams-game-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    SeasonStatsComponent,
    SeasonStatsAddEditDialogComponent,
    OffensiveGameStatsComponent,
    DefensiveGameStatsComponent,
    SpecialTeamsGameStatsComponent
  ],
  entryComponents: [SeasonStatsAddEditDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
