import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class ReadingBusesApiService {

  constructor(private http: HttpClient) { }

  getLiveJourneys(route: string): Observable<IResponse[]> {
    return this.http.get<IResponse[]>(`https://readingbusesapiproxy.azurewebsites.net/liveJourneys?vehicle=&route=${route}`);
  }
}