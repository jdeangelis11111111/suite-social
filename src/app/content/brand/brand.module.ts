import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandRoutingModule } from './brand.routes';
import { BrandCardModule } from './brand-card/brandCard.module';
import { ConfirmDialogModule } from './confirm-dialog/confirmDialog.module';
import { CarouselModule } from './carousel/carosel.module';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrandRoutingModule,
        BrandCardModule,
        ConfirmDialogModule, CarouselModule
    ]
})

export class BrandModule { }
