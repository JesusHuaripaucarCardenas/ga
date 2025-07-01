import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitricosClienteComponent } from './citricos-cliente.component';

describe('CitricosClienteComponent', () => {
  let component: CitricosClienteComponent;
  let fixture: ComponentFixture<CitricosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitricosClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitricosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
