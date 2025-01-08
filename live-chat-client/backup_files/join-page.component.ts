import { Component,OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-join-page',
  standalone: false,
  
  templateUrl: './join-page.component.html',
  styleUrl: './join-page.component.css'
})
export class JoinPageComponent implements OnInit{

  private socket! : Socket;
  username : string = "";
  
  constructor(private router : Router, private UserService : UserService){};

  ngOnInit(): void {
      this.socket = io("http://localhost:3000");
  }

  joinChat(){
    this.UserService.setUsername(this.username);
    this.socket.emit("join",this.username);
    this.router.navigate(["/chat"]);
  }

}
