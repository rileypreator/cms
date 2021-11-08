import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Boolean to declare whether the dropdown is collapsed or not
  collapse = true;

  constructor() { }

  ngOnInit(): void {
  }

}
