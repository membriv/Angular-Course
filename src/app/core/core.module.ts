import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './pages/config/config.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [ConfigComponent, HomeComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
