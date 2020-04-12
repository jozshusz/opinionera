import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';
import { TopicsPageComponent } from './topics-page/topics-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NewsPageComponent } from './news-page/news-page.component';
import { SideNavTopicsComponent } from './side-nav-topics/side-nav-topics.component';
import { SideNavNewsComponent } from './side-nav-news/side-nav-news.component';
import { SideNavRulesComponent } from './side-nav-rules/side-nav-rules.component';
import { SideNavLoginComponent } from './side-nav-login/side-nav-login.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      MainContentComponent,
      NavigationMenuComponent,
      TopicsPageComponent,
      RulesPageComponent,
      LoginPageComponent,
      NewsPageComponent,
      SideNavTopicsComponent,
      SideNavNewsComponent,
      SideNavRulesComponent,
      SideNavLoginComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatRippleModule,
      MatListModule,
      MatSidenavModule,
      MatButtonModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
