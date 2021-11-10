import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //Item to contain the contacts
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  //Event Emitter to use during injection for simplicity among the contact
  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  //Will emite the changed Contact
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  getContacts() {
    return this.contacts.slice();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
