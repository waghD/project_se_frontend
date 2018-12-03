import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightlistPage } from './freightlist.page';

describe('FreightlistPage', () => {
  let component: FreightlistPage;
  let fixture: ComponentFixture<FreightlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
