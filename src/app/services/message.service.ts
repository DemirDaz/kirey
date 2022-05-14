import { Injectable } from '@angular/core';

import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  subject = new Subject()
  messages: string[] = [];

  constructor() { }

  sendMessage(item: any) {
    console.log(item)
    this.subject.next(item) //Trigger dogadjaja
  }

  add(message: string) {
    this.messages.push(message);
    console.log(message);
  }

  getMessage() {
    return this.subject.asObservable()
  }
}
