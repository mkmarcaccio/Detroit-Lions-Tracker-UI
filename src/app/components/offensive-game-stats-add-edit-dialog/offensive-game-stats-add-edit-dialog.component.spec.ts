import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensiveGameStatsAddEditDialogComponent } from './offensive-game-stats-add-edit-dialog.component';

describe('OffensiveGameStatsAddEditDialogComponent', () => {
  let component: OffensiveGameStatsAddEditDialogComponent;
  let fixture: ComponentFixture<OffensiveGameStatsAddEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffensiveGameStatsAddEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffensiveGameStatsAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
