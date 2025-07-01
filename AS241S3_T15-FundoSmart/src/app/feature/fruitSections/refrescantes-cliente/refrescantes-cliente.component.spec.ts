import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrescantesClienteComponent } from './refrescantes-cliente.component';

describe('RefrescantesClienteComponent', () => {
  let component: RefrescantesClienteComponent;
  let fixture: ComponentFixture<RefrescantesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefrescantesClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefrescantesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
