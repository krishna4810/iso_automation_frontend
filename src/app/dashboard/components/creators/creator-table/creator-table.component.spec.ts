import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorTableComponent } from './creator-table.component';

describe('CreatorTableComponent', () => {
  let component: CreatorTableComponent;
  let fixture: ComponentFixture<CreatorTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorTableComponent]
    });
    fixture = TestBed.createComponent(CreatorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
