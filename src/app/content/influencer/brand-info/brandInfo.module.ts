import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandInfoComponent } from './brand-info.component';


const routes = [
    {
        path: '',
        component: BrandInfoComponent
    }
];

@NgModule({
    declarations: [
        BrandInfoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class BrandInfoModule { }
