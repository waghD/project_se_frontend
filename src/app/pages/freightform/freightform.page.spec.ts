import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightformPage } from './freightform.page';

describe('FreightformPage', () => {
  let component: FreightformPage;
  let fixture: ComponentFixture<FreightformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
