import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { SettingComponent } from './component/setting/setting.component';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'contact-us',loadChildren: '../app/component/contact us/contactus.module#ContactusModule'},
            {path:'setting',loadChildren:'../app/component/setting/setting.module#SettingModule'},
            {path:'employee/info',loadChildren:'../app/component/employees information/employee.module#EmployeeModule'},
            {path:'login',loadChildren:'../app/component/login/login.module#LoginModule'},
            {path:'home',loadChildren:'../app/component/home/home.module#HomeModule'},
            {path:'my/profile',loadChildren:'../app/component/my-profile/myProfile.module#MyProfileModule'},
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ], )
    ],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutes { }
