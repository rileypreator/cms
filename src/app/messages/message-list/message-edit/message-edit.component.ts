import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  //Variables to get the message and send it as a subject
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender: string = "1";

  //Event Emitter to send it to the message-list component
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageservice: MessageService) { }

  ngOnInit(): void {
  }

  //The function to run when a message is sent
  onSendMessage() {
    //This gets the subject and message value from the DOM
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    //Create a new message object
    let newMessage = new Message("", subjectValue, msgTextValue, this.currentSender);
    //emit the message to the array for the already made messages and add it to the array
    // this.addMessageEvent.emit(newMessage);
    this.messageservice.addMessage(newMessage);
    console.log("Message sent: ", newMessage);
    this.onClear();

  }
  //The function to run to clear the current message
  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
