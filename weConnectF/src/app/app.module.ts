import { APP_INITIALIZER,NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS} from '@angular/common/http' ; 
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddContentComponent } from './components/add-content/add-content.component';
import { EditContentComponent } from './components/edit-content/edit-content.component';
import { ListContentComponent } from './components/list-content/list-content.component';
import { MyInterceptor } from './init/interceptor';
import { AuthService } from './auth/service/auth.service';
import { AddEventComponent } from './components/add-event/add-event.component';





function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'master',
        clientId: 'express'
      },
      initOptions: {
        
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,AppComponent,AddContentComponent,
    EditContentComponent,ListContentComponent,AddEventComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,
    FormsModule,KeycloakAngularModule
  ],
  providers: [
    AuthService,
    {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true,
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
