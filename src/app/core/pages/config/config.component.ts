import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvas/canvasjs.min';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  private test:any = [{ y: 0, label: "juanje" },{ y: 71, label: "juanje2222" }];
  private registrosUsuarios:any[] = [];

  constructor(private _us:UserService) { }

  ngOnInit() {



    this._us.getAccesoUsuarios().subscribe(
      res => {


        res.forEach(registroFecha => {

          let registro = { y: (registroFecha[1])?registroFecha[1]:0, label:registroFecha[0]};

          this.registrosUsuarios.push(registro);

        });

        this.registrosUsuarios = this.registrosUsuarios.reverse();

        this.generarGrafico();


      });//end subscribe




  }// en onInit



  //generar grafico con los datos
  generarGrafico(){
    let chart =  new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Usuarios distintos que han accedido a la aplicación"
      },
      data: [{
        type: "column",
        dataPoints: this.registrosUsuarios/*[
          this.test,
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
      ]*/
      }]
    });

    chart.render();
  }


}//end class
