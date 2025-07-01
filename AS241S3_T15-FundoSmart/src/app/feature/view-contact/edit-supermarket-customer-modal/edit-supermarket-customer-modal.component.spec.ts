import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupermarketCustomerModalComponent } from './edit-supermarket-customer-modal.component';

describe('EditSupermarketCustomerModalComponent', () => {
  let component: EditSupermarketCustomerModalComponent;
  let fixture: ComponentFixture<EditSupermarketCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupermarketCustomerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSupermarketCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
