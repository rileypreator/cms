import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //Item to contain the contacts
  contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  //Event Emitter to use during injection for simplicity among the contact
  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  getContact(id: string): Contact {

    return this.contacts.find((contact) => contact.id === id);
  }

  getContacts() {
    return this.contacts.slice();
  }
}
