import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultdetails',
  templateUrl: './resultdetails.page.html',
  styleUrls: ['./resultdetails.page.scss'],
})
export class ResultdetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  send() {
    console.log('send');
  }

}
