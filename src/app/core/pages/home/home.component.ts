import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ControlHorario } from 'src/app/interfaces/controlHorario.interface';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _us:UserService) {

  }

  ngOnInit() {

  }

  acceder(){
    this._us.login();


  }

  salir(){

    this._us.logout();
  }

}
