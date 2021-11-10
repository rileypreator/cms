import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  //variables for the class
  documents: Document[];
  documentListChangedEvent = new Subject<Document[]>();
  
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  //Event Emitter to use during injection for simplicity among the contact
  @Output() documentSelectedEvent = new EventEmitter<Document>();

  //Will select the change document
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
  

  //gets one specific document and returns it if found. If not, returns null
  getDocument(id: string): Document {

    //get one specific document
    return this.documents.find((document) => document.id === id);
  }

  //gets an array of all the documents
  getDocuments() {
    return this.documents.slice();
  }

  //deletes the passed document from the array of documents
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
