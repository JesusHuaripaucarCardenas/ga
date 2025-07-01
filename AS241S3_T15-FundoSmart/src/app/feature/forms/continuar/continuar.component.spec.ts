import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuarComponent } from './continuar.component';

describe('ContinuarComponent', () => {
  let component: ContinuarComponent;
  let fixture: ComponentFixture<ContinuarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
