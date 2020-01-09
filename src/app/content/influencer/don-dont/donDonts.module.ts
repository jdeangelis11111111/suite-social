import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonDontComponent } from './don-dont.component';


const routes = [
    {
        path: '',
        component: DonDontComponent
    }
];

@NgModule({
    declarations: [
        DonDontComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class DonDontsModule { }
