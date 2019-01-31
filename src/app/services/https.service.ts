import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface CallOptions {
    url: string;
    headers: {
        [key in string]: string;
    };
    params?: {
        [key in string]: string;
    };
}

type Header = {
    [key in string]: string;
};

interface CallResponse {
    'count': number;
    'next': string;
    'previous': string;
    'results': any[];
}

@Injectable({
    providedIn: 'root'
})
export class HttpsService {

    private loginName = 'admin1';
    private loginPassword = '123456';

    constructor(private http: HttpClient) {
    }

    private addAuthorizationHeader(header: Header): Header {
        header['Authorization'] = 'Basic YWRtaW4xOjEyMzQ1Ng==';
        console.log(header);
        return header;
    }

    post(options: CallOptions): Promise<any[]> {
        return this.http.post(options.url, options.params, {
            headers: this.addAuthorizationHeader(options.headers),
            withCredentials: false,
            responseType: 'json',
        }).toPromise()
            .then(async (res: CallResponse) => {
                if (res.next) {
                    const nextRes = await this.post({
                        params: options.params,
                        headers: options.headers,
                        url: res.next
                    });
                    return res.results.concat(nextRes);
                }
                return res.results;
            });
    }

    get(options: CallOptions): Promise<any[]> {
        return this.http.get(options.url, {
            headers: this.addAuthorizationHeader(options.headers),
            withCredentials: false,
            responseType: 'json',
        }).toPromise()
            .then(async (res: CallResponse) => {
                if (res.next) {
                    const nextRes = await this.get({
                        params: options.params,
                        headers: options.headers,
                        url: res.next
                    });
                    return res.results.concat(nextRes);
                }
                return res.results;
            });
    }
}
