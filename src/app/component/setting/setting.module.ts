import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule ,MatCheckboxModule } from '@angular/material';

import { SettingComponent } from '../setting/setting.component';
import { ColorListComponent } from './child/color/colorList.component';
import { AddColorComponent } from './child/color/child/addcolor.component';
import { CountriesNameList } from './child/country/countriesName.component';
import { AddCountry } from './child/country/child/addCountryName.component';
import { QualificationList } from './child/qualification/qualificationList.component';
import { AddQualification } from './child/qualification/child/addQualification.component';
import { RoleListComponent } from './child/role/roleList.component';
import { AddRoleComponent } from './child/role/child/addrole.component';

@NgModule({
    imports:[CommonModule , FormsModule ,ReactiveFormsModule,MatDialogModule,MatCheckboxModule,
        RouterModule.forChild([
            {
                path:'',
                component:SettingComponent
            },
            {path:'color-list',component:ColorListComponent},
            {path:'qualification-list',component:QualificationList},
            {path:'role-list',component:RoleListComponent},
            {path:'country-list',component:CountriesNameList},
        ])
    ],
    declarations:[ SettingComponent,ColorListComponent,AddColorComponent,CountriesNameList,AddCountry,QualificationList,AddQualification,RoleListComponent,AddRoleComponent],
    providers:[],
    entryComponents:[AddColorComponent,AddCountry,AddQualification,AddRoleComponent]
})

export class SettingModule {}