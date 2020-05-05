import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { SectionsPageComponent } from './sections-page/sections-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewsPageComponent } from './news-page/news-page.component';
import { SideNavTopicsComponent } from './side-nav-topics/side-nav-topics.component';
import { SideNavNewsComponent } from './side-nav-news/side-nav-news.component';
import { SideNavRulesComponent } from './side-nav-rules/side-nav-rules.component';
import { SideNavLoginComponent } from './side-nav-login/side-nav-login.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostPageComponent } from './post-page/post-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResponsePasswordResetComponent } from './response-password-reset/response-password-reset.component';
import { OthersProfileComponent } from './others-profile/others-profile.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      MainContentComponent,
      NavigationMenuComponent,
      SectionsPageComponent,
      RulesPageComponent,
      LoginPageComponent,
      NewsPageComponent,
      SideNavTopicsComponent,
      SideNavNewsComponent,
      SideNavRulesComponent,
      SideNavLoginComponent,
      TopicPageComponent,
      PostPageComponent,
      SignupComponent,
      UserProfileComponent,
      RequestPasswordResetComponent,
      ResponsePasswordResetComponent,
      OthersProfileComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatRippleModule,
      MatListModule,
      MatSidenavModule,
      MatButtonModule,
      HttpClientModule,
      MatTableModule,
      MatPaginatorModule,
      FormsModule,
      ReactiveFormsModule,
      MatBadgeModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
