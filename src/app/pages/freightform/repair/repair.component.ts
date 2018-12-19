import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  dateDisplayFormat = 'D.M.YYYY, H:mm';
  datePickerFormat = 'DD MM YYYY HH mm';
  durationDisplayFormat = 'H:mm';
  durationPickerFormat = 'HH mm';
  minDate: string;
  maxDate: string;

  dateModel: string = new Date().toISOString();
  durationModel: string;

  count: number;
  selectType: string;
  selectTruck = 'truck';
  selectCar = 'car';
  selectContainer = 'container';
  selectPalette = 'palette';

  constructor() { }

  ngOnInit() {
  }

}
