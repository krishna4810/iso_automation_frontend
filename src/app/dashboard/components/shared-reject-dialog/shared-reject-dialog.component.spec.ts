import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRejectDialogComponent } from './shared-reject-dialog.component';

describe('SharedRejectDialogComponent', () => {
  let component: SharedRejectDialogComponent;
  let fixture: ComponentFixture<SharedRejectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedRejectDialogComponent]
    });
    fixture = TestBed.createComponent(SharedRejectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
