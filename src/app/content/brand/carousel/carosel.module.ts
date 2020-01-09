import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ CarouselComponent ],
  exports:    [ CarouselComponent ]
})
export class CarouselModule { }
