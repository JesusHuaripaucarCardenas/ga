import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSupermercadoComponent } from './forms-supermercado.component';

describe('FormsSupermercadoComponent', () => {
  let component: FormsSupermercadoComponent;
  let fixture: ComponentFixture<FormsSupermercadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsSupermercadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsSupermercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
