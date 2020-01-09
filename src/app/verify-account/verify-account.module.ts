import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyAccountComponent } from './verify-account.component';


const routes = [
    {
        path: '',
        component: VerifyAccountComponent
    }
];

@NgModule({
    declarations: [
        VerifyAccountComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class VerifyAccountModule { }
