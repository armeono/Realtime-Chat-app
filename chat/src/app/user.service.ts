import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userID = new BehaviorSubject<string>("");

  private room = new BehaviorSubject<string>("")

  private userList = new BehaviorSubject<Array<any>>([])

  currentUsers = this.userList.asObservable()

  currentID = this.userID.asObservable()

  currentRoom = this.room.asObservable()

  constructor() { }

  changeID(name: string){
    this.userID.next(name)
  }

  changeRoom(room: string){
    this.room.next(room)
  }

  addUser(list: any[]){

    const users: any = []

    list.forEach((e: string) => {

      users.push(e)

    });

    this.userList = users

    console.log(this.userList)


  }
}
