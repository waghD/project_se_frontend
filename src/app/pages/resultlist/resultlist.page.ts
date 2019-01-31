import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormDataService} from '../../services/form-data.service';

interface FreightData {
    id: number;
    img: {
        'background-image': string;
    };
    name: string;
    location: string;
    stars: string[];
    type: string;
}

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.page.html',
  styleUrls: ['./resultlist.page.scss'],
})
export class ResultlistPage implements OnInit {


  constructor(private router: Router, private formData: FormDataService, private route: ActivatedRoute) {
      this.route.queryParamMap.subscribe(params => {
          const id = parseInt(params.get('id'), 10);
          this.getData(id)
              .then()
              .catch();
      });
  }

  noLines = 'none';

  freightersData: FreightData[] = [];

  static mapTypes(type: string): string {
      switch (type) {
          case 'ROAD': {
              return 'bus';
          }
          case 'AIR': {
              return 'airplane';
          }
          case 'SHIP': {
              return 'boat';
          }
          case 'RAIL': {
              return 'train';
          }
          default: {
              return 'jet';
          }
      }
  }

  ngOnInit() {
  }

  private async getData(id?: number): Promise<void> {
      console.log('getting data no id ' + id);
      let data;
      if (id || id === 0) {
          data = this.formData.getQueryFreightData(id);
      } else {
          data = await this.formData.getFreighterData();
      }
      this.freightersData = data
          .map((freighter): FreightData => {
              const arr: string[] = Array(freighter.rating).fill('star');
              for (let i = freighter.rating + 1; i <= 5; i++){
                  arr.push('star-outline');
              }
              return {
                  id: freighter.id,
                  img: {'background-image': `url(${freighter.logo || '../assets/imgs/logo_placeholder.png'})`},
                  location: freighter.location,
                  name: freighter.name,
                  type: ResultlistPage.mapTypes(freighter.type),
                  stars: arr,
              };
          });
  }

  clicked(id: number): void {
    this.router.navigateByUrl(`/freighters/${id}`)
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
