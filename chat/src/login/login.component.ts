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

  userID: string = "";


  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {

    this.user.currentID.subscribe(ID => {
      this.userID = ID;
    })

  }

  createID(ID: any){

    socket.emit('username', ID)

    this.user.changeID(ID);

    this.router.navigate(['home']);

  
  }

}
