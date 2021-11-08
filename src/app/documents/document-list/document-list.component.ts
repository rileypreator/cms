import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  
  //Mock array containing the required documents to display multiple on the webpage
  documents: Document[] = []
  documentId: string= "";

  constructor(private documentsService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentChangedEvent.subscribe((event) => {
      this.documents = event;
    });
  }

}
