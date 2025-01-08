import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat-room',
  standalone: false,
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css',
})
export class ChatRoomComponent implements OnInit {
  username: string = '';
  message: string = '';
  chatMessages: { sender: string; text: string; type: 'chat' | 'info' }[] = [];

  private socket!: Socket;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();
    this.socket = io('http://localhost:3000');

    // Nouvel utilisateur
    this.socket.on('newUser', (message: string) => {
      this.chatMessages.push({ sender: 'System', text: message, type: 'info' });
      this.scrollToBottom();
    });

    // Utilisateur déconnecté
    this.socket.on('userLeft', (message: string) => {
      this.chatMessages.push({ sender: 'System', text: message, type: 'info' });
      this.scrollToBottom();
    });

    // Message reçu
    this.socket.on('receiveMessage', (message: { sender: string; text: string }) => {
      // N'ajoutez pas les messages envoyés par l'utilisateur lui-même
      if (message.sender !== this.username) {
        this.chatMessages.push({ ...message, type: 'chat' });
        this.scrollToBottom();
      }
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socket.emit('sendMessage', { sender: this.username, text: this.message });
      this.chatMessages.push({ sender: 'You', text: this.message, type: 'chat' });
      this.message = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatMessagesContainer = document.querySelector('.chat-messages');
      if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }
    }, 0);
  }
}
