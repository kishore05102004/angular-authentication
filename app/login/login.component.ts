import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   

  LoginUserData= { email: '', password:'' };

  constructor( private _auth : AuthService ) { }

  ngOnInit(): void {
  }

  luser()
  {
    
    this._auth.loginUser(this.LoginUserData)
    .subscribe( Response =>{
        
      console.log(Response);
      localStorage.setItem('token',Response.token)



    })


  }

}
