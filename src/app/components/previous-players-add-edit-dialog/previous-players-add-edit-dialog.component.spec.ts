import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPlayersAddEditDialogComponent } from './previous-players-add-edit-dialog.component';

describe('PreviousPlayersAddEditDialogComponent', () => {
  let component: PreviousPlayersAddEditDialogComponent;
  let fixture: ComponentFixture<PreviousPlayersAddEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousPlayersAddEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousPlayersAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
