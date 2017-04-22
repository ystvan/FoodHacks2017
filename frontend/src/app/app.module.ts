import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DinnerDetailsComponent } from './dinner-details/dinner-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DinnerListComponent } from './dinner-list/dinner-list.component';



@NgModule({
  declarations: [
    AppComponent,
    DinnerDetailsComponent,
    SignInComponent,
    SignUpComponent,
    NavigationComponent,
    DinnerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
