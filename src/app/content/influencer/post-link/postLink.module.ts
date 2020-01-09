import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostLinkComponent } from './post-link.component';


const routes = [
    {
        path: '',
        component: PostLinkComponent
    }
];

@NgModule({
    declarations: [
        PostLinkComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class PostLinkModule { }
