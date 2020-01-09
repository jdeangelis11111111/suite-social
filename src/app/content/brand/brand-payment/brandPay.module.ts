import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandPaymentComponent } from './brand-payment.component';


const routes = [
    {
        path: '',
        component: BrandPaymentComponent
    }
];

@NgModule({
    declarations: [
        BrandPaymentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class payBrandModule { }
