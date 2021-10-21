import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message("1", "This the the first subject", "This is the first message", "Riley Preator"),
    new Message("2", "This is the second subject", "This is the second message", "Tyli Preator"),
    new Message("3", "This is the third subject", "This is the third message", "Jamie Cromar")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
