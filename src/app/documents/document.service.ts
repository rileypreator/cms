import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  //variables for the class
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  //CONSTRUCTOR
  constructor(private httpClient: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  //gets an array of all the documents via Firebase
  getDocuments() {
    this.httpClient.get("https://cms-project-abe2d-default-rtdb.firebaseio.com/documents.json")

      //success method
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.documentListChangedEvent.next(this.documents.slice());
      },

      //error method
      (error: any) => {
        console.log(error);
      }
      );

      return this.documents;
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
    this.storeDocuments()
  }

  //This will run in the constructor when created to get the max ID of the most recent document
  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((document) => {
      let currentId = parseInt(document.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  //Adds a new document to the list of documents by creating a copy and assigning the next highest ID to the document
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice()

    this.storeDocuments();

  }

  //This updates an already existing document if changes are being made on it
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  //stores the documents to firebase
  storeDocuments() {
    let JSONdocuments = JSON.stringify(this.documents);

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.put("https://cms-project-abe2d-default-rtdb.firebaseio.com/documents.json", JSONdocuments,{headers: headers})
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice())
      }
      )
  }
}
