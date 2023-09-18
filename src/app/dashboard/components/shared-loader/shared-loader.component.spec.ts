import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLoaderComponent } from './shared-loader.component';

describe('SharedLoaderComponent', () => {
  let component: SharedLoaderComponent;
  let fixture: ComponentFixture<SharedLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedLoaderComponent]
    });
    fixture = TestBed.createComponent(SharedLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
