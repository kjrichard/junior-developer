import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  public status: any;
  public collectionSize: any;
  public newUserForm: FormGroup;
  public Submitted = false;
  public update = false;
  public idUser: any;
  public responce: any;
  constructor(  
  private userService: UserService, 
  private modalService: NgbModal, 
  private formBuilder: FormBuilder,
  ) { 
  this.newUserForm = this.formBuilder.group({
    password:  ['', Validators.required],
    name:  ['', Validators.required],
    surname:  ['', Validators.required],
    lastSurname:  ['', Validators.required],
    phone:  ['', Validators.required]
  }); 
  }

  get uf() {
    return this.newUserForm.controls;
  }

  ngOnInit(): void {
    this.getUsers();

  }


  open(content: any, update = false ) {
    this.update = update;
    this.modalService.open(content);
     
   }

   openModal(content: any, user: any) {
    this.newUserForm.controls.name.setValue(user.name);
    this.newUserForm.controls.password.setValue('123456');
    this.newUserForm.controls.surname.setValue(user.surname);
    this.newUserForm.controls.lastSurname.setValue(user.lastSurname);
    this.newUserForm.controls.phone.setValue(user.phone); 
    this.idUser = user.id; 
    this.modalService.open(content);
 }


  newUser( ) {
    try {
      console.log(this.newUserForm);
      
      this.userService.newUser(this.newUserForm.value).subscribe(
        ( res ) => {
         this.responce = res;
         if (this.responce.status) {
          console.log(this.responce);
          this.getUsers();
          this.newUserForm.reset();
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'success',
            title: this.responce.message,
            showConfirmButton: false,
            timer: 1500
          });
         }else {
         
         }
        }, (error) => {
          console.log(error);
          if (error['status']) {
            Swal.fire({
              icon: 'error',
              text: error.error.message,
              footer: 'Intentalo nuevamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error en el servidor. !Contacte a soporte',
              showConfirmButton: false,
              timer: 3000
            });
          }
        }
      ) 
    } catch (error) {
      console.log(error);
    }
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      ( res: User[] ) => {
        this.users = res;
        console.log(this.users);
        
      },
      err => {
        console.log(err);
        
      }
    )
  }

  deleteUser(id: String){
    console.log(id);
    
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Esta accion no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser( id ).subscribe(
          ( res ) => {
            this.getUsers();
           console.log(res);
           Swal.fire(
            'Eliminado!',
            'Usuario Eliminado.',
            'success'
          )}
          ), (error) => {
            console.log(error.error);
            this.getUsers();
          };
      
      }
    });
  }


  updateUser() {
    try {
      this.userService.updateUser(this.idUser, this.newUserForm.value).subscribe(
        ( res ) => {
          this.modalService.dismissAll();
          this.getUsers();
          Swal.fire({
            icon: 'success',
            title: 'Actualizacion exitosa',
            showConfirmButton: false,
            timer: 1500
          });
          this.newUserForm.reset();
        }
      )
    } catch (error) {
      console.log(error);
      
    }
  }

}



