import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  // Event Emitter to determine which event is clicked on
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  //Used to emit the selected document
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
  
  //Mock array containing the required documents to display multiple on the webpage
  documents: Document[] = [
    new Document("1", "First document", "This is the description for the first document", "None", "None"),
    new Document("2", "Second document", "This is the description for the second document", "None", "None"),
    new Document("3", "Third document", "This is the description for the Third document", "None", "None"),
    new Document("4", "Fourth document", "This is the description for the Fourth document", "None", "None"),
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
