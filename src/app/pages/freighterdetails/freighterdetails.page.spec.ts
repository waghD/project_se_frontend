import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreighterdetailsPage } from './freighterdetails.page';

describe('FreighterdetailsPage', () => {
  let component: FreighterdetailsPage;
  let fixture: ComponentFixture<FreighterdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreighterdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreighterdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
