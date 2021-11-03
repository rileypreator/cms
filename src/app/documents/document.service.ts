import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[];
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  //Event Emitter to use during injection for simplicity among the contact
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  

  //gets one specific document and returns it if found. If not, returns null
  getDocument(id: string): Document {

    //get one specific document
    this.documents.forEach(function (document) {
      if (document.id == id) {
        return document;
      }
    });

    return null;
  }

  //gets an array of all the documents
  getDocuments() {
    return this.documents.slice();
  }
}