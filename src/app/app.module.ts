import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KitchenComponent } from './kitchen/kitchen.component';

@NgModule({
  declarations: [
    AppComponent,
    KitchenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [KitchenComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
