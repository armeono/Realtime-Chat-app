import { ThisReceiver } from '@angular/compiler';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
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

socket.on('users', (list: any[]) => {

  userListFunction(list)

    
});

socket.on('disconnected', (socket: any) => {

  console.log(`${socket} has disconnected`)

  users = users.filter((user: any) => user.code != socket )

  console.log(users)

  userListFunction(users)




})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  userList: any = []

  

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

    this.user.currentUsers.subscribe(list => {
      users = list
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

function userListFunction(list: any[]){

  let div = document.getElementById('user-list')

  while(div?.firstChild){
    div.removeChild(div.firstChild)
  }


  users = list

  users.forEach((element: any) => {

  const li = document.createElement('li')

  li.textContent = element.id

  document.getElementById('user-list')?.append(li)


    
  });
}
export default socket;


