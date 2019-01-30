import { Injectable } from '@angular/core';
import {HttpsService} from './https.service';

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

  transportType: TransportTypeData[];

  constructor(private http: HttpsService) {  }

  async getTransportTypes(): Promise<TransportTypeData[]> {
      if (this.transportType) {
          return this.transportType;
      } else {
          return this.http.get({
              url: '../assets/mockData/transportTypes.json',
              headers: {}
          }).then(res => {
              return res as TransportTypeData[]
          });
      }
  }

  getSpecials(): string[] {
    return ['crane', 'plane', 'persona space', 'fluids', 'open'];
  }

  getLicenses(): string[] {
    return ['euro-6 norm', 'Staplerschein', 'Gefahrenguttransport', 'Schwertransport', 'Überlänge'];
  }
}
