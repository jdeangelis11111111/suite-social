import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandReqComponent } from './brand-req.component'

const routes = [
    {
        path: '',
        component: BrandReqComponent
    }
];

@NgModule({
    declarations: [
        BrandReqComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class BrandReqModule { }
