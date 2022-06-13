import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensiveGameStatsComponent } from './defensive-game-stats.component';

describe('DefensiveGameStatsComponent', () => {
  let component: DefensiveGameStatsComponent;
  let fixture: ComponentFixture<DefensiveGameStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefensiveGameStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefensiveGameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
