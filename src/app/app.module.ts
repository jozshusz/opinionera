import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MiddleSectionComponent } from './middle-section/middle-section.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';
import { HomePageComponent } from './home-page/home-page.component';
import { TopicsPageComponent } from './topics-page/topics-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      MiddleSectionComponent,
      MainContentComponent,
      NavigationMenuComponent,
      HomePageComponent,
      TopicsPageComponent,
      RulesPageComponent,
      LoginPageComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatRippleModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
