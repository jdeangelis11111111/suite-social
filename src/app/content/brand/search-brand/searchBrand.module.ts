import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBrandComponent } from './search-brand.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    MatRippleModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StarRatingModule } from 'angular-star-rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './../../../shared/shared.module'


const routes = [
    {
        path: '',
        component: SearchBrandComponent
    }
];

@NgModule({
    declarations: [
        SearchBrandComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatRippleModule,
        MatTabsModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatListModule,
        MatSidenavModule,
        StarRatingModule.forRoot(),
        NgxPaginationModule,
        NgxDatatableModule, SharedModule
    ]
})

export class searchBrandModule { }
