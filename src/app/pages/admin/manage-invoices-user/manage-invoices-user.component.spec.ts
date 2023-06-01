import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvoicesUserComponent } from './manage-invoices-user.component';

describe('ManageInvoicesUserComponent', () => {
  let component: ManageInvoicesUserComponent;
  let fixture: ComponentFixture<ManageInvoicesUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInvoicesUserComponent]
    });
    fixture = TestBed.createComponent(ManageInvoicesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
