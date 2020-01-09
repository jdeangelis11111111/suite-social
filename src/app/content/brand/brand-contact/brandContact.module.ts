import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandContactComponent } from './brand-contact.component';


const routes = [
    {
        path: '',
        component: BrandContactComponent
    }
];

@NgModule({
    declarations: [
        BrandContactComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class contactBrandModule { }
