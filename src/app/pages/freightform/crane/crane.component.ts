import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crane',
  templateUrl: './crane.component.html',
  styleUrls: ['./crane.component.scss']
})
export class CraneComponent implements OnInit {


  dateDisplayFormat = 'D.M.YYYY, H:mm';
  datePickerFormat = 'DD MM YYYY HH mm';
  durationDisplayFormat = 'H:mm';
  durationPickerFormat = 'HH mm';
  minDate: string;
  maxDate: string;

  dateModel: string = new Date().toISOString();
  durationModel: string;

  operationPlace: string;

  loadLength: number;
  loadWeight: number;

  craneWidth: number;
  craneSupportWith: number;
  craneHeight: number;
  craneLength: number;
  transportLoad: number;
  stackedLabel = 'stacked';

  constructor() { }

  ngOnInit() {
  }

}
