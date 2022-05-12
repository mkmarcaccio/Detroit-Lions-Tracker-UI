import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensiveGameStatsComponent } from './offensive-game-stats.component';

describe('OffensiveGameStatsComponent', () => {
  let component: OffensiveGameStatsComponent;
  let fixture: ComponentFixture<OffensiveGameStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffensiveGameStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffensiveGameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
