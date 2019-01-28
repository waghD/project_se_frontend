import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.page.html',
  styleUrls: ['./resultlist.page.scss'],
})
export class ResultlistPage implements OnInit {

  noLines = 'none';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clicked(): void {
    this.router.navigateByUrl('/resultdetails')
        .then(() => {
          console.log('navigated');
        })
        .catch(error => {
          console.error('navigation error');
        });
  }

  goToHome(): void {
      this.router.navigateByUrl('/dashboard');
  }

}
