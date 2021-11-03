import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
   }

  //This returns one specific message with the id being passed in through a parameter
  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }
  // gets the entire array of messages
  getMessages() {
    return this.messages.slice();
  }

  //adds a message to the array
  addMessage(message: Message) {
    console.log("Add message", message)
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
