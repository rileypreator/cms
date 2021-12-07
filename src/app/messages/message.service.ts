import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private httpClient: HttpClient) {
    this.messages = MOCKMESSAGES;
   }

  //This returns one specific message with the id being passed in through a parameter
  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  //adds a message to the array
  addMessage(message: Message) {
    console.log("Add message", message)
    this.messages.push(message);
    this.storeMessages();
  }

  //gets the max ID that will be added to the newest message
  getMaxID(): number {
    let maxId = 0;

    this.messages.forEach((message) => {
      let currentId = parseInt(message.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  //gets the messages from Firebase
  getMessages() {
    this.httpClient.get("https://cms-project-abe2d-default-rtdb.firebaseio.com/messages.json")

    //success method
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxID();
        this.messages.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        this.messageChangedEvent.next(this.messages.slice());
      },
      
      (error: any) => {
        console.log(error);
      }
      );

      return this.messages;
  }

  storeMessages() {
    let JSONmessages = JSON.stringify(this.messages);

    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    this.httpClient.put("https://cms-project-abe2d-default-rtdb.firebaseio.com/messages.json", JSONmessages,{headers: headers})
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice())
      }
      )
  }
}
