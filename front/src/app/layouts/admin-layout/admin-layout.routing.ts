import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth.guard';
import { AdminComponent } from 'app/pages/admin/admin.component';


import { UserComponent } from '../../pages/user/user.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin',            component: AdminComponent, canActivate: [AuthGuard]},
    { path: 'user',                 component: UserComponent, canActivate: [AuthGuard] },
  
];
