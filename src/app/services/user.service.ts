import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ControlHorario } from '../interfaces/controlHorario.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario:User = {};
  private itemsCollection: AngularFirestoreCollection<ControlHorario>;

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) { }


  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
              .then(infoUser => {

                if(!infoUser)
                    return;

                  this.usuario.nombre = infoUser.user.displayName;
                  this.usuario.uid = infoUser.user.uid;
                  this.anadirRegistroUsuario()
                          .catch(err => console.log(err));

              });
  }
  logout() {
    this.afAuth.auth.signOut();

    this.usuario = {};
  }



  /*
  * Obtener todos los registros de acceso de usuarios ordenados por fecha.
  */

  getControlesUsuarios(){

    this.itemsCollection = this.afs.collection<ControlHorario>('registro_usuarios', ref=> ref.orderBy("Fecha_entrada", 'desc'));


    return this.itemsCollection.valueChanges().pipe(
      map( (controlesUsuarios: ControlHorario[]) =>{

      return controlesUsuarios;
      })
    );

  }//end getControlesUsuarios

  /*
  * Añade el primer inicio de sesion de un usuario
  */

  anadirRegistroUsuario(){

    var hoy = new Date();
    var dd = String(hoy.getDate()).padStart(2, '0');
    var mm = String(hoy.getMonth() + 1).padStart(2, '0');
    var yyyy = hoy.getFullYear();

    let fechaEntrada = `${yyyy}-${mm}-${dd}`;
    let horaEntrada = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`


    let nuevoControl:ControlHorario = {

      uid:this.usuario.uid,
      Fecha_entrada: fechaEntrada,
      Hora_entrada: horaEntrada,
      Hora_salida: null
    }



    //promise
    return this.itemsCollection.add(nuevoControl);


  }// end anadirRegistroUsuario


  registroSalida(){


    this.itemsCollection = this.afs.collection<ControlHorario>('registro_usuarios');

  let prueba = this.itemsCollection.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        console.log("ejecutado");
        return console.log(data, id, a);


    });
    })
);





  }



}
