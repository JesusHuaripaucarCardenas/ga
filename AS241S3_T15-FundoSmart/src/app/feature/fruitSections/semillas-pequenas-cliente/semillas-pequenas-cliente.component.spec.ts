import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemillasPequenasClienteComponent } from './semillas-pequenas-cliente.component';

describe('SemillasPequenasClienteComponent', () => {
  let component: SemillasPequenasClienteComponent;
  let fixture: ComponentFixture<SemillasPequenasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemillasPequenasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemillasPequenasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
