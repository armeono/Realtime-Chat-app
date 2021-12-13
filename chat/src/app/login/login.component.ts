import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { UserService } from '../user.service';
import socket from '../home/home.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userList: any = [];

  userID: string = "";

   room: string = "";


  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {

    this.user.currentID.subscribe(ID => {
      this.userID = ID;
    })



    this.user.currentRoom.subscribe(room => { 
      this.room = room;
    })

    this.user.currentUsers.subscribe(list => { 
      this.userList = list
    })

   

  }

  setUpChat(ID: any, room: string){

    this.user.changeRoom(room);

    this.user.changeID(ID);

    socket.emit('setup', ID, room)

    this.userList.push({
      id: ID
    })

    socket.on('users', (userList: any) => { 
      this.user.addUser(userList);
    })

    console.log(this.userList)

  


    this.router.navigate(['home']);

    
  }

  

}
