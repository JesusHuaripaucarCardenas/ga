import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TropicalesClienteComponent } from './tropicales-cliente.component';

describe('TropicalesClienteComponent', () => {
  let component: TropicalesClienteComponent;
  let fixture: ComponentFixture<TropicalesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TropicalesClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TropicalesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
