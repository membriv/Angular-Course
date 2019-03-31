import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ControlHorario } from 'src/app/interfaces/controlHorario.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _us:UserService) {

  }

  ngOnInit() {
    this._us.getControlesUsuarios()
        .subscribe((res:ControlHorario[]) => console.log(res));

  }

  acceder(){
    this._us.login();

  }

  salir(){

    this._us.logout();
  }

}
