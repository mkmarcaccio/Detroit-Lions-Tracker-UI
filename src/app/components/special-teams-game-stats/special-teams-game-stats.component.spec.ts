import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTeamsGameStatsComponent } from './special-teams-game-stats.component';

describe('SpecialTeamsGameStatsComponent', () => {
  let component: SpecialTeamsGameStatsComponent;
  let fixture: ComponentFixture<SpecialTeamsGameStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialTeamsGameStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialTeamsGameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
