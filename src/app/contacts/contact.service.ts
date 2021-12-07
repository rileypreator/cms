import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //Item to contain the contacts
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private httpClient: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  //Event Emitter to use during injection for simplicity among the contact
  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  //Will emite the changed Contact
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  //gets the stored contacts via Firebase and loads them into the application.
  getContacts() {
    this.httpClient.get("https://cms-project-abe2d-default-rtdb.firebaseio.com/contacts.json")

      //success method
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      //error method
      (error: any) => {
        console.log(error);
      });

      return this.contacts;
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
    this.storeContacts();
  }

  //Gets the lowest possible ID that can be used for the new document
  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach((contact) => {
      let currentId = parseInt(contact.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
  
  //Adds the newest contact with the lowest possible ID added to it
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();

    this.storeContacts();
  }

  //Updates an already created contract
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  storeContacts() {
    let JSONcontacts = JSON.stringify(this.contacts);

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.put("https://cms-project-abe2d-default-rtdb.firebaseio.com/contacts.json", JSONcontacts,{headers: headers})
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice())
      }
      )
  }
 }
