import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationProductComponent } from './informationproduct.component';

describe('InformationproductComponent', () => {
  let component: InformationProductComponent;
  let fixture: ComponentFixture<InformationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
