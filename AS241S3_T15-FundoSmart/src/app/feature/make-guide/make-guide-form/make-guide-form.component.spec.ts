import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGuideFormComponent } from './make-guide-form.component';

describe('MakeGuideFormComponent', () => {
  let component: MakeGuideFormComponent;
  let fixture: ComponentFixture<MakeGuideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeGuideFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeGuideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
