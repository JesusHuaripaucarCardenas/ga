import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermarketCustomerListComponent } from './supermarket-customer-list.component';

describe('SupermarketCustomerListComponent', () => {
  let component: SupermarketCustomerListComponent;
  let fixture: ComponentFixture<SupermarketCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupermarketCustomerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupermarketCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
