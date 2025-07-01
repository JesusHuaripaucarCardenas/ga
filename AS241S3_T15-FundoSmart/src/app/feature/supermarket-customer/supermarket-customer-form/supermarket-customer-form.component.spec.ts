import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermarketCustomerFormComponent } from './supermarket-customer-form.component';

describe('SupermarketCustomerFormComponent', () => {
  let component: SupermarketCustomerFormComponent;
  let fixture: ComponentFixture<SupermarketCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupermarketCustomerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupermarketCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
