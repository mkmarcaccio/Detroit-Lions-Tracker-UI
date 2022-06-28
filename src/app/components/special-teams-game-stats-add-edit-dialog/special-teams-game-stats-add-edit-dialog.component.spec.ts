import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTeamsGameStatsAddEditDialogComponent } from './special-teams-game-stats-add-edit-dialog.component';

describe('SpecialTeamsGameStatsAddEditDialogComponent', () => {
  let component: SpecialTeamsGameStatsAddEditDialogComponent;
  let fixture: ComponentFixture<SpecialTeamsGameStatsAddEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialTeamsGameStatsAddEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialTeamsGameStatsAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
