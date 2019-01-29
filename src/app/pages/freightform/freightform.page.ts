import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {FormDataService} from '../../services/form-data.service';

interface TransportTypeData {
  id: number;
  iconName: string;
  iconColor: string;
  active: boolean;
  value: string;
  readableName: string;
  count: number;
  switch: (id: number) => void;
}

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

  freightTypeLabel = '';
  freightTypeSelected = false;
  transportType: TransportTypeData[] = [];

  specials: string[] = [];
  currentlySelectedSpecial = '';
  pickedSpecials: {id: number, value: string}[] = [];
  private pickedSpecialsCurrentId = 0;

  licenses: string[] = [];
  currentlySelectedLicense = '';
  pickedLicense: {id: number, value: string}[] = [];
  private pickedLicenseCurrentId = 0;

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

  ratingCommunicationIcons = Array(5).fill('star-outline');
  communicationRating = 0;
  communicationFixated = false;
  ratingPunctualityIcons = Array(5).fill('star-outline');
  punctualityRating = 0;
  punctualityFixated = false;

  constructor(private router: Router, private toastCtrl: ToastController, private formService: FormDataService) {
    const year = new Date().getFullYear();
    this.minDate = `${year - 1}-01-01`;
    this.maxDate = `${year + 1}-12-31` ;
    this.setupTransportTypes();
    this.setupSpecials();
  }

  private setupTransportTypes(): void {
    this.transportType = this.formService.getTransportTypes().map((type, index: number): TransportTypeData => {
      return {
        id: index,
        active: false,
        count: type.count,
        iconColor: 'medium',
        iconName: type.iconName,
        readableName: type.readableName,
        value: type.value,
        switch: (id: number): void => {
          this.transportType[id].active = !this.transportType[id].active;
          this.transportType[id].iconColor = this.transportType[id].active ? 'primary' : 'medium';
          this.buildFreightTypeLabel();
        }
      };
    });
  }

  private setupSpecials(): void {
    this.specials = this.formService.getSpecials();
    this.licenses = this.formService.getLicenses();
  }

  private buildFreightTypeLabel(): void {
    console.log('buildFreigType called');
    this.freightTypeSelected = false;
    this.freightTypeLabel = '';
    let count = 0;
    let activeCount = 0;
    for (const key in this.transportType) {
      if (this.transportType[key].active) {
        this.freightTypeSelected = true;
        activeCount++;
        if (this.freightTypeLabel) { this.freightTypeLabel += ', '; }
        this.freightTypeLabel += `${this.transportType[key].count} ${this.transportType[key].readableName}`;
        count += this.transportType[key].count;
      }
    }
    if (activeCount >= 2) { this.freightTypeLabel += `, ${count} Frächter total`; }
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
    if (!this.currentlySelectedSpecial) { return; }
    const index = this.pickedSpecials.findIndex(special => special.value === this.currentlySelectedSpecial);
    if (index !== -1) {
      this.showToast('Item bereits vorhanden')
          .then()
          .catch();
    } else {
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

  addLicense(): void {
    if (!this.currentlySelectedLicense) { return; }
    const index = this.pickedLicense.findIndex(license => license.value === this.currentlySelectedLicense);
    if (index !== -1) {
      this.showToast('Item bereits vorhanden')
          .then()
          .catch();
    } else {
      this.pickedLicense.push({
        id: this.pickedLicenseCurrentId,
        value: this.currentlySelectedLicense
      });
      this.pickedLicenseCurrentId++;
      this.currentlySelectedLicense = '';
    }
  }

  async deleteLicense(id: number): Promise<void> {
    const index = this.pickedLicense.findIndex(license => license.id === id);
    if (index !== -1) {
      this.pickedLicense.splice(index, 1);
    } else {
      console.error('unable to delete item');
      this.showToast('Ein fehler ist aufgetreten. Item kann nicht gelöscht werden.')
          .then()
          .catch();
    }
  }

  communicationEnter(id: number): void {
    if (this.communicationFixated) { return; }
    for (let i = 0; i <= id; i++) {
      this.ratingCommunicationIcons[i] = 'star';
    }
    for (let i = ++id; i < this.ratingCommunicationIcons.length; i++) {
      this.ratingCommunicationIcons[i] = 'star-outline';
    }
    this.communicationRating = id;
  }

  communicationFixate(id: number): void {
    this.communicationFixated = !(this.communicationRating === id + 1 && this.communicationFixated);
    for (let i = 0; i <= id; i++) {
      this.ratingCommunicationIcons[i] = 'star';
    }
    for (let i = ++id; i < this.ratingCommunicationIcons.length; i++) {
      this.ratingCommunicationIcons[i] = 'star-outline';
    }
    this.communicationRating = id;
  }

  punctualityEnter(id: number): void {
    if (this.punctualityFixated) { return; }
    for (let i = 0; i <= id; i++) {
      this.ratingPunctualityIcons[i] = 'star';
    }
    for (let i = ++id; i < this.ratingPunctualityIcons.length; i++) {
      this.ratingPunctualityIcons[i] = 'star-outline';
    }
    this.punctualityRating = id;
  }


  punctualityFixate(id: number): void {
    this.punctualityFixated = !(this.punctualityRating === id + 1 && this.punctualityFixated);
    for (let i = 0; i <= id; i++) {
      this.ratingPunctualityIcons[i] = 'star';
    }
    for (let i = ++id; i < this.ratingPunctualityIcons.length; i++) {
      this.ratingPunctualityIcons[i] = 'star-outline';
    }
    this.punctualityRating = id;
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
