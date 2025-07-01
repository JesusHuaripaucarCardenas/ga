import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsMercadoComponent } from './forms-mercado.component';

describe('FormsMercadoComponent', () => {
  let component: FormsMercadoComponent;
  let fixture: ComponentFixture<FormsMercadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsMercadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsMercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
