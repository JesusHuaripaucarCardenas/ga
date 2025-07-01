import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCustomerFormComponent } from './market-customer-form.component';

describe('MarketCustomerFormComponent', () => {
  let component: MarketCustomerFormComponent;
  let fixture: ComponentFixture<MarketCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCustomerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
