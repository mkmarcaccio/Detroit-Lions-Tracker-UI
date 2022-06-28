import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensiveGameStatsAddEditDialogComponent } from './defensive-game-stats-add-edit-dialog.component';

describe('DefensiveGameStatsAddEditDialogComponent', () => {
  let component: DefensiveGameStatsAddEditDialogComponent;
  let fixture: ComponentFixture<DefensiveGameStatsAddEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefensiveGameStatsAddEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefensiveGameStatsAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
