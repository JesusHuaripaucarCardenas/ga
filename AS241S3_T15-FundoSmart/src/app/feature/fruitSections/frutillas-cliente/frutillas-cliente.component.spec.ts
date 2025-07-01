import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutillasClienteComponent } from './frutillas-cliente.component';

describe('FrutillasClienteComponent', () => {
  let component: FrutillasClienteComponent;
  let fixture: ComponentFixture<FrutillasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrutillasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrutillasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
