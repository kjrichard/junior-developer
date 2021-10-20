import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: any;
}

export const ROUTES: RouteInfo[] = [
   
    { path: './user',       title: 'Perfil',    icon: 'nc-single-02',  class: '', role: [ 2, 1 ] },
    { path: './admin',    title: 'Administrador',  icon: 'nc-settings',      class: '', role: [ 1 ] },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public user = {
        roleId:1
    };
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.menuItems = ROUTES.filter(menuItem => {
            for (let j = 0; j < menuItem.role.length; j++) {
                const r = menuItem.role[j];
                if(r === this.user.roleId){
                    return r;
                }
            }
        });
        
    }
}