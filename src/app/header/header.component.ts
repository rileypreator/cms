import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Used to select the current feature on the CMS
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
