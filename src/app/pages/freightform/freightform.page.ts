import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  send(): void {
    this.router.navigateByUrl('/resultlist');
  }

}
