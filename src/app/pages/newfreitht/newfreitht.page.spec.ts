import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfreithtPage } from './newfreitht.page';

describe('NewfreithtPage', () => {
  let component: NewfreithtPage;
  let fixture: ComponentFixture<NewfreithtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfreithtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfreithtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
