import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {

    //Array that the filtered contacts will be a part of
    let filteredContacts: Contact[] = [];

    //filters through the array and adds them if they are being filtered
    if (term && term.length > 0) {
      
      filteredContacts = contacts.filter((contact: Contact) => 
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    //if the list has no contacts, return the normal list
    if (filteredContacts.length < 1) {
      return contacts;
    }

    return filteredContacts;
  }

}
