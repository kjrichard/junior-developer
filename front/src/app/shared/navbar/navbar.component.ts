import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
  constructor( private authService: AuthService, private router: Router) {
 
}

  ngOnInit(){ }

  logout() {
    this.authService.logout();
    window.location.reload();
  }


   

}
