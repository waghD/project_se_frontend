import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  cardHeadColor = 'secondary';
  btnColor = 'tertiary';
  labelColor = 'medium';

  adminPage = 'http://127.0.0.1:8000/admin/';
  newFreightPage = 'http://127.0.0.1:8000/admin/logistics/roadfreightcompany/add/';

  newsItemTemplateMultiplier = Array(10).fill(1);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToForm(): void {
    this.router.navigateByUrl('/freightform');
  }

}
