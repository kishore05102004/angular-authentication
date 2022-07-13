import { Component, OnInit } from '@angular/core';

import { EventsService } from './../events.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  sevents:any=[]

  constructor( private auth : EventsService ) { }

  ngOnInit(): void {
    this.auth.getSpecial()
    .subscribe(data => this.sevents = data )
  }

}
