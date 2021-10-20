import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserComponent }            from '../../pages/user/user.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from 'app/pages/admin/admin.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  declarations: [
    UserComponent,
    AdminComponent,
  
  ],
  providers: [
   
  ],
})

export class AdminLayoutModule {}
