import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public collapseStatus = true;
  constructor() { }

  ngOnInit(): void {
  }

  collapse():void{
    this.collapseStatus = !this.collapseStatus
  }

}
