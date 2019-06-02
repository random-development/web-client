import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainpageModule } from './mainpage/mainpage.module';
import { LoginModule } from './login/login.module';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainpageModule,
    LoginModule
  ],
  bootstrap: [AppComponent],
  providers: [UserService]
})
export class AppModule { }
