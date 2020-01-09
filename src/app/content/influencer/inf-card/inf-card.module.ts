import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule,
    MatCardModule, MatDialogModule
} from '@angular/material';

import { InfCardComponent } from './inf-card.component';

const routes: Routes = [
    {
        path: '',
        component: InfCardComponent,
    }
];

@NgModule({

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CdkTableModule, FormsModule, ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        MatCardModule
    ],
    providers: [

    ], declarations: [
        InfCardComponent
    ],
    entryComponents: [InfCardComponent],
    exports: [InfCardComponent]
})
export class InfCardModule {
}