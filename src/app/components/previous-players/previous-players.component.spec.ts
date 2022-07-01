import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPlayersComponent } from './previous-players.component';

describe('PreviousPlayersComponent', () => {
  let component: PreviousPlayersComponent;
  let fixture: ComponentFixture<PreviousPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
