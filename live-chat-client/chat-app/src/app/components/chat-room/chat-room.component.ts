import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  
  username: string = "";
  loginMessage: string = "";
  loginMessages: string[] = [];
  message: string = "";
  chatMessages: { sender: string, text: string }[] = [];
  
  private socket!: Socket;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();
    this.socket = io("http://localhost:3000");

    this.socket.on("newUser", (loginMessage: string) => {
      this.loginMessages.push(loginMessage);
    });

    this.socket.on("receiveMessage", (message: { sender: string, text: string }) => {
      if (message.sender !== this.username) {
        this.chatMessages.push(message);
      }
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socket.emit("sendMessage", { sender: this.username, text: this.message });
      this.chatMessages.push({ sender: "You", text: this.message });
      this.message = "";
    }
  }
}