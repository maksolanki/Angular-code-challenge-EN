import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {ReactiveFormsModule} from "@angular/forms";
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleInfoComponent,
  ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}, {}),
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
