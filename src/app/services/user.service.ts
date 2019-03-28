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
  private controlHorUsuario:ControlHorario;
  private itemsCollection: AngularFirestoreCollection<ControlHorario>;

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

               }


  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
              .then(infoUser => {

                if(!infoUser)
                    return;

                  this.usuario.nombre = infoUser.user.displayName;
                  this.usuario.uid = infoUser.user.uid;

                  this.primerAcceso()
                        .then(res => {

                          console.log(res);


                          if(res)
                          this.anadirRegistroUsuario()
                              .catch(err => console.log(err));
                          else{
                            return;
                          }


                        });
              });
  }
  logout() {
    this.afAuth.auth.signOut()
            .then(() => {

           this.registroSalida()
                  .then(() => {


                  this.usuario = {};
                });



            });

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

    let fechaEntrada = this.obtenerFechaActual();
    let horaEntrada = this.obtenerHoraActual();

    this.controlHorUsuario = {

      uid:this.usuario.uid,
      Fecha_entrada: fechaEntrada,
      Hora_entrada: horaEntrada,
      Hora_salida: null
    }



    //promise
    return this.itemsCollection.add(this.controlHorUsuario);


  }// end anadirRegistroUsuario


  registroSalida(){


    return this.afs.firestore.collection("registro_usuarios").where("uid","==",this.usuario.uid)
    .get()
    .then(querySnapshot => {

          let idCollection = querySnapshot.docs[0].id;


          this.controlHorUsuario = {

            uid:this.usuario.uid,
            Fecha_entrada: querySnapshot.docs[0].data().Fecha_entrada,
            Hora_entrada: querySnapshot.docs[0].data().Hora_entrada,
            Hora_salida: this.obtenerHoraActual()
          }


          let horaSalida = this.obtenerHoraActual();
          this.controlHorUsuario.Hora_salida = horaSalida;

          this.afs.collection("registro_usuarios").doc(idCollection).update(this.controlHorUsuario)
                .catch(err => console.log("ERROR: "+err));

          })
    .catch(err => console.log("ERROR: "+err));


  }//end registroSalida


  /*
  Para evitar codigo repetido, extraigo en una funcion privata la obtencion de la fecha actual
  en formato sql, yyy-mm-dd, que se almacena en este formato en firebase.
   - return: string
  */

  private obtenerFechaActual():string{

    let hoy = new Date();
    let dd = String(hoy.getDate()).padStart(2, '0');
    let mm = String(hoy.getMonth() + 1).padStart(2, '0');
    let yyyy = hoy.getFullYear();


    return  `${yyyy}-${mm}-${dd}`;

  }


  /*
  Se utiliza para registrar en firebase la hora de entrada y de salida del usuario
    - return: string
  */

  private obtenerHoraActual():string{

    let hoy = new Date();

    return `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

  }


  /*
  Funcion que devuelve si el usuario con un uid ha accedido durante el dia actual a la aplicacion
    - return: boolean
  */

  private primerAcceso(){

    let fechaActual = this.obtenerFechaActual();


    return this.afs.firestore.collection("registro_usuarios").where("uid","==",this.usuario.uid)
                                                      .where("Fecha_entrada","==",fechaActual)
    .get()
    .then(querySnapshot => {


          if(!querySnapshot.docs.length)
              return true;

          return false;

          })
    .catch(err => console.log("ERROR: "+err));

  }



}//end class service
