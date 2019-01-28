import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-freightform',
  templateUrl: './freightform.page.html',
  styleUrls: ['./freightform.page.scss'],
})
export class FreightformPage implements OnInit {

  searchBtnFill = 'solid';
  searchBtnExpand = 'block';
  searchBtnSize = 'default';

  iconBtnFill = 'clear';

  transportType = [{
    id: 0,
    iconName: 'bus',
    iconColor: 'medium',
    active: false,
    typeVal: 'truck',
    switch: (id: number) => {
      this.transportType[id].active = !this.transportType[id].active;
      this.transportType[id].iconColor = this.transportType[id].active ? 'primary' : 'medium';
    }
  }, {
    id: 1,
    iconName: 'boat',
    iconColor: 'medium',
    active: false,
    typeVal: 'ship',
    switch: (id: number) => {
      this.transportType[id].active = !this.transportType[id].active;
      this.transportType[id].iconColor = this.transportType[id].active ? 'primary' : 'medium';
    }
  }, {
    id: 2,
    iconName: 'airplane',
    iconColor: 'medium',
    active: false,
    typeVal: 'plane',
    switch: (id: number) => {
      this.transportType[id].active = !this.transportType[id].active;
      this.transportType[id].iconColor = this.transportType[id].active ? 'primary' : 'medium';
    }
  }, {
    id: 3,
    iconName: 'train',
    iconColor: 'medium',
    active: false,
    typeVal: 'rail',
    switch: (id: number) => {
      this.transportType[id].active = !this.transportType[id].active;
      this.transportType[id].iconColor = this.transportType[id].active ? 'primary' : 'medium';
    }
  }];

  specials = ['crane', 'plane', 'persona space', 'fluids', 'open'];

  currentlySelectedSpecial = '';

  pickedSpecials: {id: number, value: string}[] = [];
  private pickedSpecialsCurrentId = 0;

  vonInput: string;
  toInput: string;
  dateDisplayFormat = 'D.M.YYYY';
  timeDisplayFormat = 'H:mm';
  datePickerFormat = 'DD MM YYYY';
  timePickerFormat = 'HH mm';
  minDate: string;
  maxDate: string;

  datePickupModel: string = new Date().toISOString();
  timePickupModel: string = new Date().toISOString();
  dateDropModel: string = new Date().toISOString();
  timeDropModel: string = new Date().toISOString();

  weight = 0;

  constructor(private router: Router, private toastCtrl: ToastController) {
    const year = new Date().getFullYear();
    this.minDate = `${year - 1}-01-01`;
    this.maxDate = `${year + 1}-12-31` ;
  }

  ngOnInit() {
  }

  send(): void {
    this.router.navigateByUrl('/resultlist');
  }

  goToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }

  addSpecial(): void {
    const index = this.pickedSpecials.findIndex(special => special.value === this.currentlySelectedSpecial);
    if (index !== -1){
      this.showToast('Item bereits vorhanden')
          .then()
          .catch();
    } else{
      this.pickedSpecials.push({
        id: this.pickedSpecialsCurrentId,
        value: this.currentlySelectedSpecial
      });
      this.pickedSpecialsCurrentId++;
      this.currentlySelectedSpecial = '';
    }
  }

  async deleteSpecial(id: number): Promise<void> {
    const index = this.pickedSpecials.findIndex(special => special.id === id);
    if (index !== -1) {
      this.pickedSpecials.splice(index, 1);
    } else {
      console.error('unable to delete item');
      this.showToast('Ein fehler ist aufgetreten. Item kann nicht gelöscht werden.')
          .then()
          .catch();
    }
  }

  private async showToast(msg: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      duration: 2000,
      message: msg,
      position: 'bottom',
      translucent: true
    });
    toast.present();
  }

}
