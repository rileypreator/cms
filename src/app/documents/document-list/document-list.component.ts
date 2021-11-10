import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  
  //Mock array containing the required documents to display multiple on the webpage
  documents: Document[] = []
  subscription: Subscription;

  constructor(private documentsService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentChangedEvent.subscribe((event) => {
      this.documents = event;
    });

    this.subscription = this.documentsService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
