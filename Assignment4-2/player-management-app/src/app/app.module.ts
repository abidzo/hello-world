import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerFormComponent } from './player-form/player-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    PlayerFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
