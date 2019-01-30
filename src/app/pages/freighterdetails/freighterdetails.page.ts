import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TransportTypeData} from '../freightform/freightform.page';
import {FormDataService} from '../../services/form-data.service';

@Component({
  selector: 'app-freighterdetails',
  templateUrl: './freighterdetails.page.html',
  styleUrls: ['./freighterdetails.page.scss'],
})
export class FreighterdetailsPage implements OnInit {

  iconBtnFill = 'clear';

  freighterName = 'Schachinger Logistik Holding GmbH';
  freighterAdress = 'Logistikpark 1, 4063 Hörsching, Österreich';
  freighterTelefone = '+43 7221 707-0';
  freighterEmail = 'office@schachinger.com';

  private freighterType = 'ROAD';

  editing = false;

  transportType: TransportTypeData[] = [];

  constructor(private router: Router, private formService: FormDataService) {
    this.setupTransportTypes()
        .then()
        .catch();
  }

  ngOnInit() {
  }


  private async setupTransportTypes(): Promise<void> {
    try {
      this.transportType = await this.formService.getTransportTypes()
          .then(res => {
            return res.map((type, index: number): TransportTypeData => {
              return {
                id: index,
                active: this.freighterType === type.value,
                count: type.count,
                iconColor: (this.freighterType === type.value) ? 'primary' : 'medium',
                iconName: type.iconName,
                readableName: type.readableName,
                value: type.value,
                switch: (id: number): void => {
                  if (!this.editing) { return; }
                  this.transportType[id].active = !this.transportType[id].active;
                  this.transportType[id].iconColor = this.transportType[id].active ? 'primary' : 'medium';
                }
              };
            });
          });
    } catch (e) {
      console.error('error getting transportTypes');
      console.log(e);
    }
  }

  goToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
