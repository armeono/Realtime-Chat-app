import { ThisReceiver } from '@angular/compiler';
import { Component , OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserService } from '../user.service';

const socket: any = io('http://localhost:3000')

let userID: string = '';

let users: any = []

socket.on('receive-message', (message: any, id: any) => {

  console.log(message)

  const div = document.createElement('div')

  div.textContent = id + ": " + message

  document.getElementById("message-container")?.append(div)
  

})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  room: string = ""

  constructor(private user: UserService) { }

  ngOnInit(): void {

    this.user.currentID.subscribe(ID => {

      if(ID === ""){
        userID = "guest"
      }else {

        userID = ID;

      }
      
    })

    this.user.currentRoom.subscribe(roomid => { 
      this.room = roomid;
    })

    if(userID !== ""){

      this.connected(userID)

    }else {

      this.connected("guest");

    }
    
  }

  displayMessage(message: any) {

    if(message === ''){
      return
    }else{

    socket.emit("send-message", message, this.room);

    const div = document.createElement('div')

    div.textContent = message

    div.style.textAlign = 'right'
  
    document.getElementById("message-container")?.append(div);

    console.log(this.room);

    


    (<HTMLInputElement>document.getElementById("message-input")).value = "";

    }


  }

  connected(id: string){

    const div = document.createElement("div")
  
    div.textContent = `You connected with id: ${id}`
  
    document.getElementById("message-container")?.appendChild(div);
  
    
    
  
  }

  

  


}
export default socket;


