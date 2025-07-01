import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareGuideListComponent } from './prepare-guide-list.component';

describe('PrepareGuideListComponent', () => {
  let component: PrepareGuideListComponent;
  let fixture: ComponentFixture<PrepareGuideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareGuideListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareGuideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
