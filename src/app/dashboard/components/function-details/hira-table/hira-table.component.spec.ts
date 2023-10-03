import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraTableComponent } from './hira-table.component';

describe('HiraTableComponent', () => {
  let component: HiraTableComponent;
  let fixture: ComponentFixture<HiraTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiraTableComponent]
    });
    fixture = TestBed.createComponent(HiraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
