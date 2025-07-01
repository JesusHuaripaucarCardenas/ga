import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareGuideFormComponent } from './prepare-guide-form.component';

describe('PrepareGuideFormComponent', () => {
  let component: PrepareGuideFormComponent;
  let fixture: ComponentFixture<PrepareGuideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareGuideFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareGuideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
