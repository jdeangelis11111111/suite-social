import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info.component';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule,
    MatCardModule, MatDialogModule
} from '@angular/material';

const routes = [
    {
        path: '',
        component: PersonalInfoComponent
    }
];

@NgModule({
    declarations: [
        PersonalInfoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,   MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
        MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule,
        MatCardModule, MatDialogModule
    ]
})

export class PersonalInfoModule { }
