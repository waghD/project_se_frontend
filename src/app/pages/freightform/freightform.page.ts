import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freightform',
  templateUrl: './freightform.page.html',
  styleUrls: ['./freightform.page.scss'],
})
export class FreightformPage implements OnInit {

  searchBtnFill = 'solid';
  searchBtnExpand = 'block';
  searchBtnSize = 'default';

  typeModel: string;
  typeSelectTransportVal = 'transport';
  typeSelectKranVal = 'crane';
  typeSelectInstanthaltungVal = 'repair';

  constructor() { }

  ngOnInit() {
  }

}
