import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCustomerListComponent } from './market-customer-list.component';

describe('MarketCustomerListComponent', () => {
  let component: MarketCustomerListComponent;
  let fixture: ComponentFixture<MarketCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCustomerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
