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

  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  getContact(id: string): Contact {

    //for every contact that equals the value, it will return the contact
    this.contacts.forEach(function (contact) {
      if (contact.id == id) {
        return contact;
      }
    });

    return null;
  }

  getContacts() {
    return this.contacts.slice();
  }
}
