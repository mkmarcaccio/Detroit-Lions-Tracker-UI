import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersAddEditDialogComponent } from './players-add-edit-dialog.component';

describe('PlayersAddEditDialogComponent', () => {
  let component: PlayersAddEditDialogComponent;
  let fixture: ComponentFixture<PlayersAddEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersAddEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
