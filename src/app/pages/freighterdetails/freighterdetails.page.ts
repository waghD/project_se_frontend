import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-freighterdetails',
  templateUrl: './freighterdetails.page.html',
  styleUrls: ['./freighterdetails.page.scss'],
})
export class FreighterdetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
