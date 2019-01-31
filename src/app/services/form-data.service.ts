import {Injectable} from '@angular/core';
import {HttpsService} from './https.service';

interface TransportTypeData {
    iconName?: string;
    src?: string;
    value: string;
    readableName: string;
    count: number;
}

interface FreighterData {
    'id': number;
    'name': string;
    'type': string;
    'location': string;
    'rating': number;
    'destinations': string[];
    'revenue': number;
    'founding_year': string;
    'logo': string;
}

@Injectable({
    providedIn: 'root'
})
export class FormDataService {

    constructor(private http: HttpsService) {
    }

    transportType: TransportTypeData[];

    specials: string[];

    licenses: string[];

    freighterData: {
        [key in number]: FreighterData[];
    } = {};

    currentFormId = 0;

    metaData: {
        airfreight: number,
        roadfreight: number,
        shipfreight: number,
        railfreight: number,
        countries: string[],
    } = {
        airfreight: 0,
        roadfreight: 0,
        shipfreight: 0,
        railfreight: 0,
        countries: []
    };

    totalFreightData: FreighterData[] = [];

    static sortFreighterData(data: FreighterData[]): FreighterData[] {
        return data.sort((a, b) => {
            if (a.rating > b.rating) {
                return -1;
            } else if (a.rating === b.rating) {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name === b.name) {
                    return 0;
                } else {
                    return -1;
                }
            } else {
                return 1;
            }
        });
    }

    init(): void {
        this.getTransportTypes()
            .then()
            .catch(error => {
                console.error('error in setup getting transport Types');
                console.log(error);
            });
        this.getFreighterData()
            .then()
            .catch(error => {
                console.error('error in setup getting freighter data');
                console.log(error);
            });
        this.loadSpecials()
            .then()
            .catch(error => {
                console.error('error in setup getting freighter data');
                console.log(error);
            });
        this.loadLicenses()
            .then()
            .catch(error => {
                console.error('error in setup getting freighter data');
                console.log(error);
            });
    }

    submitForm(type: string, rating: number): number {
        this.freighterData[this.currentFormId] = this.totalFreightData.filter(freighter => {
                return freighter.type === type && freighter.rating >= rating;
            });
        console.log(this.freighterData[this.currentFormId]);
        return this.currentFormId++;
    }

    private buildMetaData(): void {
        this.metaData = {
            airfreight: 0,
            railfreight: 0,
            roadfreight: 0,
            shipfreight: 0,
            countries: []
        };
        this.totalFreightData.forEach(freighter => {
            switch (freighter.type) {
                case 'AIR': {
                    this.metaData.airfreight++;
                    break;
                }
                case 'ROAD': {
                    this.metaData.roadfreight++;
                    break;
                }
                case 'SHIP': {
                    this.metaData.shipfreight++;
                    break;
                }
                case 'RAIL': {
                    this.metaData.railfreight++;
                    break;
                }
            }
            freighter.destinations.forEach(destination => {
                const index = this.metaData.countries.findIndex(country => country === destination);
                if (index === -1) {
                    this.metaData.countries.push(destination);
                }
            });
        });
        if (this.transportType) {
            let index = this.transportType.findIndex(type => type.value === 'RAIL');
            this.transportType[index].count = this.metaData.railfreight;
            index = this.transportType.findIndex(type => type.value === 'AIR');
            this.transportType[index].count = this.metaData.airfreight;
            index = this.transportType.findIndex(type => type.value === 'ROAD');
            this.transportType[index].count = this.metaData.roadfreight;
            index = this.transportType.findIndex(type => type.value === 'SHIP');
            this.transportType[index].count = this.metaData.shipfreight;
        }
    }

    getMetaData() {
        return this.metaData;
    }

    async getTransportTypes(): Promise<TransportTypeData[]> {
        if (this.transportType) {
            return this.transportType;
        } else {
            return this.http.get({
                url: '../assets/mockData/transportTypes.json',
                headers: {}
            }).then(res => {
                const data = res as TransportTypeData[];
                data.forEach(type => {
                    switch (type.value) {
                        case 'AIR': {
                            type.count = this.metaData.airfreight;
                            break;
                        }
                        case 'ROAD': {
                            type.count = this.metaData.roadfreight;
                            break;
                        }
                        case 'SHIP': {
                            type.count = this.metaData.shipfreight;
                            break;
                        }
                        case 'RAIL': {
                            type.count = this.metaData.railfreight;
                            break;
                        }
                    }
                });
                return data;
            });
        }
    }

    private async loadSpecials(): Promise<void> {
        this.http.get({
            url: 'http://127.0.0.1:8000/api/features/',
            headers: {}
        }).then(res => {
            this.specials = res.map(special => special.name);
            console.log(res);
        });
    }

    private async loadLicenses(): Promise<void> {
        this.http.get({
            url: 'http://127.0.0.1:8000/api/permissions/',
            headers: {}
        }).then(res => {
            this.licenses = res.map(special => special.name);
            console.log(res);
        });
    }

    async getFreighterData(): Promise<FreighterData[]> {
        return this.http.get({
            url: 'http://127.0.0.1:8000/api/freighters/',
            headers: {}
        }).then(res => {
            this.totalFreightData = FormDataService.sortFreighterData(res as FreighterData[]);
            console.log(res);
            this.buildMetaData();
            return this.totalFreightData;
        });
    }

    getQueryFreightData(id: number): FreighterData[] {
        return this.freighterData[id];
    }

    getSpecials(): string[] {
        return this.specials;
    }

    getLicenses(): string[] {
        return this.licenses;
    }
}
