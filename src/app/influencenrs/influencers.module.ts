import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfluencenrsComponent } from './influencenrs.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes = [
    {
        path: '',
        component: InfluencenrsComponent
    }
];

@NgModule({
    declarations: [InfluencenrsComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
    ]
  })

export class InfluencersModule { }
