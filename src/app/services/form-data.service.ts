import { Injectable } from '@angular/core';

interface TransportTypeData {
  iconName?: string;
  src?: string;
  value: string;
  readableName: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  transportType: TransportTypeData[] = [{
    iconName: 'bus',
    value: 'truck',
    readableName: 'LKW Frächter',
    count: 174,
  }, {
    iconName: 'boat',
    value: 'ship',
    readableName: 'Schiff Frächter',
    count: 5,
  }, {
    iconName: 'airplane',
    value: 'plane',
    readableName: 'Luft Frächter',
    count: 2,
  }, {
    iconName: 'train',
    value: 'rail',
    readableName: 'Zug Frächter',
    count: 4,
  }];

  constructor() { }

  getTransportTypes(): TransportTypeData[] {
    return this.transportType;
  }

  getSpecials(): string[] {
    return ['crane', 'plane', 'persona space', 'fluids', 'open'];
  }

  getLicenses(): string[] {
    return ['euro-6 norm', 'Staplerschein', 'Gefahrenguttransport', 'Schwertransport', 'Überlänge'];
  }
}
