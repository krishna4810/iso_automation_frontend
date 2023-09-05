import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedApproveDialogComponent } from './shared-approve-dialog.component';

describe('SharedApproveDialogComponent', () => {
  let component: SharedApproveDialogComponent;
  let fixture: ComponentFixture<SharedApproveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedApproveDialogComponent]
    });
    fixture = TestBed.createComponent(SharedApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
