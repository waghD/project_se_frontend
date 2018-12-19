import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  vonInput: string;
  toInput: string;
  dateDisplayFormat = 'D.M.YYYY, H:mm';
  datePickerFormat = 'DD MM YYYY HH mm';
  minDate: string;
  maxDate: string;

  datePickupModel: string = new Date().toISOString();
  dateDropModel: string = new Date().toISOString();

  typeSelect: string;
  typeLiquid = 'liquid';
  typeBox = 'Box';
  typePalette = 'palette';
  typeOpen = 'open';

  boxLength: number;
  boxWidth: number;
  boxHeight: number;
  itemCount: number;
  itemWeight: number;

  liquidVolume: number;

  dangerous = false;

  constructor() {
      const year = new Date().getFullYear();
      this.minDate = `${year - 1}-01-01`;
      this.maxDate = `${year + 1}-12-31` ;
  }

  ngOnInit() {
  }

    typeSelection() {
        if (this.typeSelect === this.typePalette) {
            this.boxLength = 1200;
            this.boxWidth = 800;
        }
    }
}
