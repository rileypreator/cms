import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  //Variables to get the message and send it as a subject
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender: string = "Riley Preator";

  //Event Emitter to send it to the message-list component
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  //The function to run when a message is sent
  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    let newMessage = new Message("1", subjectValue, msgTextValue, this.currentSender);

    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }
  //The function to run to clear the current message
  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
