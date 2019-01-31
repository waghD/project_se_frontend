import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransportTypeData} from '../freightform/freightform.page';
import {FormDataService} from '../../services/form-data.service';
import {HttpClient} from '@angular/common/http';

interface freighter {
    'id': number;
    'name': string;
    'type': string;
    'location': string;
    'rating': number;
    'destinations': string[];
    'revenue': number;
    'founding_year': string;
    'logo': null;
}

@Component({
    selector: 'app-freighterdetails',
    templateUrl: './freighterdetails.page.html',
    styleUrls: ['./freighterdetails.page.scss'],
})
export class FreighterdetailsPage implements OnInit {

    id: number;

    vehicleBaseUrl = '';
    vehicleFetchUrl = '';

    btnColor = 'secondary';

    vehicles: {
        id: number,
        name: string,
    }[] = [];

    iconBtnFill = 'clear';

    logo: string;

    freighterName: string;
    freighterAdress: string;
    freighterRevenue: number;
    freighterDestinations: string[];
    freighterRating: string[];

    private freighterType: string;

    editing = false;

    transportType: TransportTypeData[] = [];

    constructor(private router: Router, private formService: FormDataService, private http: HttpClient, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(paramMap => {
            this.id = parseInt(paramMap.get('id'), 10);
            this.setup();
        });
    }

    ngOnInit() {
    }

    setup(): void {
        this.http.get(`http://127.0.0.1:8000/api/freighters/${this.id}/`, {
            headers: {
                'Authorization': 'Basic YWRtaW4xOjEyMzQ1Ng=='
            },
            responseType: 'json',
        }).toPromise().then(res => {
            const data = res as freighter;
            this.freighterName = data.name;
            this.freighterType = data.type;
            this.freighterAdress = data.location;
            this.freighterRevenue = data.revenue;
            this.freighterRating = Array(data.rating).fill('star');
            this.freighterDestinations = data.destinations;
            this.logo = data.logo || '../assets/imgs/logo_placeholder.png';
            this.setupTransportTypes()
                .then()
                .catch();
            this.setupUrls();
            this.getVehicles();
        });
    }

    setupUrls(): void {
        switch (this.freighterType) {
            case 'ROAD': {
                this.vehicleBaseUrl = 'http://127.0.0.1:8000/truck';
                break;
            }
            case 'AIR': {
                this.vehicleBaseUrl = 'http://127.0.0.1:8000/plane';
                break;
            }
            case 'SHIP': {
                this.vehicleBaseUrl = 'http://127.0.0.1:8000/ship';
                break;
            }
            case 'RAIL': {
                this.vehicleBaseUrl = 'http://127.0.0.1:8000/train';
                break;
            }
            default: {
                this.vehicleBaseUrl = 'http://127.0.0.1:8000/truck';
            }
        }

    }

    getVehicles(): void {
        switch (this.freighterType) {
            case 'ROAD': {
                this.vehicleFetchUrl = `http://127.0.0.1:8000/api/roadfreight/${this.id}/trucks`;
                break;
            }
            case 'AIR': {
                this.vehicleFetchUrl = `http://127.0.0.1:8000/api/airfreight/${this.id}/planes`;
                break;
            }
            case 'SHIP': {
                this.vehicleFetchUrl = `http://127.0.0.1:8000/api/seafreight/${this.id}/ships`;
                break;
            }
            case 'RAIL': {
                this.vehicleFetchUrl = `http://127.0.0.1:8000/api/railfreight/${this.id}/trains`;
                break;
            }
        }
        this.http.get(this.vehicleFetchUrl, {
            responseType: 'json',
            headers: {
                'Authorization': 'Basic YWRtaW4xOjEyMzQ1Ng=='
            },
        }).toPromise()
            .then(res => {
                const data = res as any;
                this.vehicles = data.results.map(result => {
                    return {
                        id: result.id,
                        name: result.name
                    };
                });
            })
            .catch();
    }

    editVehicles(id: number): void {

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
                            iconColor: (this.freighterType === type.value) ? this.btnColor : 'light',
                            iconName: type.iconName,
                            readableName: type.readableName,
                            value: type.value,
                            switch: (id: number): void => {
                                if (!this.editing) {
                                    return;
                                }
                                this.transportType[id].active = !this.transportType[id].active;
                                this.transportType[id].iconColor = this.transportType[id].active ? this.btnColor : 'light';
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
