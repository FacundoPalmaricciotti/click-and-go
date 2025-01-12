import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationproductComponent } from './informationproduct.component';

describe('InformationproductComponent', () => {
  let component: InformationproductComponent;
  let fixture: ComponentFixture<InformationproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
