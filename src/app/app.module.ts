import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Features
import { CreateShowModule } from './features/create-show';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      progressBar: true,
      enableHtml: true
    }),
    // BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(), // ToastrModule added

    // CreateShowModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
