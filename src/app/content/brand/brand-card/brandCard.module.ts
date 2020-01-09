import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule,
    MatCardModule, MatDialogModule, MatDatepickerModule
} from '@angular/material';

import { BrandCardComponent } from './brand-card.component';

const routes: Routes = [
    {
        path: '',
        component: BrandCardComponent,
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
        MatCardModule,MatDatepickerModule
    ],
    providers: [

    ], declarations: [
        BrandCardComponent
    ],
    entryComponents: [BrandCardComponent],
    exports: [BrandCardComponent]
})
export class BrandCardModule {
}