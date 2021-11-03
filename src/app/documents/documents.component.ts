import { Component, Input, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument: Document;
  constructor(private documentsService: DocumentService) { }

  ngOnInit(): void {
    this.documentsService.documentSelectedEvent.subscribe((result) => {
      this.selectedDocument = result;
    });
  }

}
