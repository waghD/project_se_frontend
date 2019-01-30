import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CallOptions {
  url: string;
  headers: {
    [key in string]: string;
  };
  params?: {
    [key in string]: string;
  };
}

type CallResponse =  {
  [key in string]: any
}

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(private http: HttpClient) { }

  post(options: CallOptions): Promise<CallResponse> {
    return this.http.post(options.url, options.params, options.headers).toPromise();
  }

  get(options: CallOptions): Promise<CallResponse> {
    return this.http.get(options.url, options.headers).toPromise();
  }
}
