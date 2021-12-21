import { ThisReceiver } from '@angular/compiler';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { AfterViewInit, Component , OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserService } from '../user.service';

const socket: any = io('http://localhost:3000')

let userID: string = '';

let users: any = []

let currentInput: string = ""


socket.on('receive-message', (message: any, id: any) => {


  

  console.log(message)

  const div = document.createElement('div')

  const div2 = document.createElement('div')

  div.className = "flex border-2 p-2 m-3 rounded-lg border-gray bg-gray"

  div2.className = "flex p-2 m-3 w-auto rounded-lg text-transparent"

  div.textContent = id + ": " + message

  div2.textContent = message

  document.getElementById("new-message")?.append(div)

  document.getElementById("my-message")?.append(div2);

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
  
currentInput: any = ""
 

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
    const div2 = document.createElement('div')

    div.className = "flex border-2 p-2 m-3 w-auto rounded-lg border-chat-bubble bg-chat-bubble "

    div2.className = "flex p-2 m-3 w-auto rounded-lg text-transparent"
   

    div.textContent = message

    div2.textContent = message
  
    

    document.getElementById("new-message")?.append(div2);

    document.getElementById("my-message")?.append(div);


    (<HTMLInputElement>document.getElementById("message-input")).value = "";

    }


  }

  connected(id: string){

    // const div = document.createElement("div")
  
    // div.textContent = `You connected with id: ${id}`
  
    // document.getElementById("my-message")?.appendChild(div);
  
    
    
  
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


