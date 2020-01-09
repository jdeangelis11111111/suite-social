import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatCardModule } from '@angular/material';

const routes = [
    {
        path: '',
        component: PaymentComponent
    }
];

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule, NgxPayPalModule, MatCardModule
    ]
})

export class PaymentModule { }
