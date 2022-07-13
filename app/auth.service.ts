import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url="http://localhost:3000/api/register";
  private _Loginurl="http://localhost:3000/api/login";

  constructor(private http: HttpClient) { }


  registerUser(User:any){
   return this.http.post<any>(this._url,User)
  }

  loginUser(User:any){
    return this.http.post(this._Loginurl,User)
  }

  
}
