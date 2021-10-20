import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public authForm: FormGroup; 
  public Submitted = false;
  public token: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private authService: AuthService,
  ) { 
    this.authForm = this.formBuilder.group({
      username:  ['', Validators.required],
      password:  ['', Validators.required]
    }); 
  }



  ngOnInit(): void {
  }

  get af() {
    return this.authForm.controls;
  }

  login(){
   
    
    console.log(this.authForm.value);
    
   this.authService.login(this.authForm.value)
    .subscribe(
      (res:any) => {
        console.log(res);
        this.token = res;
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('id', JSON.stringify(res.user.id));
        localStorage.setItem('token', this.token.token);
        this.router.navigate(['/user']);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesion exitoso',
          showConfirmButton: false,
          timer: 1500
        })
      }, 
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Acceso denegado!',
        })
    }) 
  } 

}
