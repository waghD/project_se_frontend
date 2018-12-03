import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultlistPage } from './resultlist.page';

describe('ResultlistPage', () => {
  let component: ResultlistPage;
  let fixture: ComponentFixture<ResultlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
