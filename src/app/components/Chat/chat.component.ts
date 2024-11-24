import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { ChatMessage } from '../../authentication/models/chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  messageInput: string="";
  currentUserId: string = ""; 
  otherUserId: string = "";  
  roomId: string = "";       
  messageList: any[] = [];

  constructor(private chat: ChatService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.params['userId'];
    this.otherUserId = this.getCurrentUserIdFromToken();
    this.roomId = this.chat.generateRoomId(this.currentUserId, this.otherUserId);
      this.chat.joinRoom(this.roomId);
      this.listenerMessage();
  }

  sendMessage(){
    const chatMessage = {
      message : this.messageInput,
      user : this.currentUserId
    }as ChatMessage
    this.chat.sendMessage(this.roomId, chatMessage);
    this.messageInput = '';
  }

  listenerMessage(){
    this.chat.getMessageSubject().subscribe((message: any)=> {
      this.messageList = message.map((item: any)=>({
        ...item,
        message_side: item.user === this.currentUserId ? 'sender': 'receiver'
      }))
    });
  }

  private getCurrentUserIdFromToken(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return '';
  }
}
