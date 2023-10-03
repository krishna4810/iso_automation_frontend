import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaiTableComponent } from './eai-table.component';

describe('EaiTableComponent', () => {
  let component: EaiTableComponent;
  let fixture: ComponentFixture<EaiTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EaiTableComponent]
    });
    fixture = TestBed.createComponent(EaiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
