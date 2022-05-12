import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonStatsAddEditDialogComponent } from './season-stats-add-edit-dialog.component';

describe('SeasonStatsAddEditDialogComponent', () => {
  let component: SeasonStatsAddEditDialogComponent;
  let fixture: ComponentFixture<SeasonStatsAddEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonStatsAddEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonStatsAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
