import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base-component';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BaseComponent
  ]
})
export class CoreModule { }
