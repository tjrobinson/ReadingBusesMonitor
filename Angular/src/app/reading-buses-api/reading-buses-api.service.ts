import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class ReadingBusesApiService {

  constructor(private http: HttpClient) { }

  getLiveJourneys(route: string, vehicle: string = ""): Observable<any[]> {
    return this.http.get<any[]>(`https://readingbusesapiproxy.azurewebsites.net/liveJourneys?vehicle=&route=${route}`);
  }
}
