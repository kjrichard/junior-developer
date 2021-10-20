import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User[] = [];
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
    this.getUser();

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


  getUser(){
    this.idUser = localStorage.getItem('id');
    this.userService.getUser(this.idUser).subscribe(
      ( res: any ) => {
        this.user = res.user;
        console.log(this.user);
        
      },
      err => {
        console.log(err);
        
      }
    )
  }

  deleteUser(id: String){
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
            this.getUser();
           console.log(res);
           Swal.fire(
            'Eliminado!',
            'Usuario Eliminado.',
            'success'
          )}
          ), (error) => {
            console.log(error.error);
            this.getUser();
          };
      
      }
    });
  }


  updateUser() {
    try {
      this.userService.updateUser(this.idUser, this.newUserForm.value).subscribe(
        ( res ) => {
          this.modalService.dismissAll();
          this.getUser();
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



