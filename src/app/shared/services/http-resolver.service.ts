import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpResolverService {

  constructor(private http: HttpClient) { }

  // post req 
  realizarHttpPost(requestUrl: string, bodyObject: Object) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(requestUrl, bodyObject, {
      headers: headers
    });
  }

  // get req 
  realizarHttpGet(requestUrl: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(requestUrl, {
      headers: headers
    });
  }

}
