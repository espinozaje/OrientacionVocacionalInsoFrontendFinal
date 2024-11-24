import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { ChatMessage } from '../authentication/models/chat-message';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  
  constructor(private http: HttpClient) { 
    this.initConnectionSocket();
  }

  initConnectionSocket(){

    const url =  'https://orientacionvocacionalapinsofinal-inso.up.railway.app/api/v1/chat-socket'
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string){
    this.stompClient.connect({},() =>{
      this.stompClient.subscribe(`/topic/${roomId}`,(messages: any) =>{
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);
      })
    })
    this.loadMessage(roomId);
  }

  sendMessage(roomId: string, chatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }


  getMessageSubject(){
    return this.messageSubject.asObservable();
  }

  loadMessage(roomId: string): void {
    this.http.get<any[]>(`${environment.apiUrl}api/v1/api/chat/${roomId}`).pipe(
     map(result=>{
        return result.map(res=> {
          return {
          user: res.user_name,
          message: res.message
         } as ChatMessage;
        });
      })
    ).subscribe({
      next: (chatMessage: ChatMessage[]) =>{
        this.messageSubject.next(chatMessage);
      },
      error:(error)=>{
       
      }
    });
  }


  generateRoomId(userId1: string, userId2: string): string {
    // Ordenar los IDs para garantizar consistencia
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
  }


}
