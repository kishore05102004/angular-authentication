import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _url="http://localhost:3000/api/events";
  private _Specialurl="http://localhost:3000/api/special";

  constructor( private http : HttpClient) { }

  getEvents()
  {
    return this.http.get<any>(this._url)
  }

  getSpecial()
  {
    return this.http.get<any>(this._Specialurl)
  }
}
