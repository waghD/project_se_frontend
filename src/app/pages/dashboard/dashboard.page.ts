import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormDataService} from '../../services/form-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  cardHeadColor = 'primary';
  btnColor = 'secondary';
  labelColor = 'medium';

  adminPage = 'http://127.0.0.1:8000/admin/';
  newFreightPage = 'http://127.0.0.1:8000/freighter/add';

  metaData: {
    airfreight: number,
    roadfreight: number,
    shipfreight: number,
    railfreight: number,
    countries: string[],
  };

  newsItemTemplateMultiplier = Array(10).fill(1);

  constructor(private router: Router, private formData: FormDataService) {
    setInterval(() => {
      this.metaData = this.formData.getMetaData();
    }, 100);
  }

  ngOnInit() {
  }

  goToForm(): void {
    this.router.navigateByUrl('/freightform');
  }

  goToList():void {
    this.router.navigateByUrl('/freighters');
  }

}
