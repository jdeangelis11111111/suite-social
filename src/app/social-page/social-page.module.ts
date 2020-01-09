import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialPageComponent } from './social-page.component';


const routes = [
    {
        path: '',
        component: SocialPageComponent
    }
];

@NgModule({
    declarations: [
        SocialPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class SocialPageModule { }
