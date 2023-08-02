import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavToolbarComponent } from './sidenav-toolbar.component';

describe('SidenavToolbarComponent', () => {
  let component: SidenavToolbarComponent;
  let fixture: ComponentFixture<SidenavToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavToolbarComponent]
    });
    fixture = TestBed.createComponent(SidenavToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
