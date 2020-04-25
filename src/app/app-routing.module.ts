import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionsPageComponent } from './sections-page/sections-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { SideNavTopicsComponent } from './side-nav-topics/side-nav-topics.component';
import { SideNavNewsComponent } from './side-nav-news/side-nav-news.component';
import { SideNavRulesComponent } from './side-nav-rules/side-nav-rules.component';
import { SideNavLoginComponent } from './side-nav-login/side-nav-login.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BeforeLoginService } from './api/login/before-login.service';
import { AfterLoginService } from './api/login/after-login.service';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResponsePasswordResetComponent } from './response-password-reset/response-password-reset.component';


const routes: Routes = [
  //the sidebar stays in place
  { path: '', redirectTo: '/sections(sidebar:topics)', pathMatch: 'full'},
  { path: 'sections', redirectTo: '/sections(sidebar:topics)', pathMatch: 'full'},
  { path: 'news', redirectTo: '/news(sidebar:news)', pathMatch: 'full'},
  { path: 'rules', redirectTo: '/rules(sidebar:rules)', pathMatch: 'full'},
  { path: 'login', redirectTo: '/login(sidebar:login)', pathMatch: 'full'},
  { path: 'signup', redirectTo: '/signup(sidebar:login)', pathMatch: 'full'},
  { path: 'profile', redirectTo: '/profile(sidebar:login)', pathMatch: 'full'},
  { path: 'reqpwreset', redirectTo: '/reqpwreset(sidebar:login)', pathMatch: 'full'},
  //{ path: 'responsepwreset', redirectTo: '/responsepwreset(sidebar:login)', pathMatch: 'full'},
  { path: 'section/:sectionId/:topicId', redirectTo: '/section/:sectionId/:topicId(sidebar:topics)', pathMatch: 'full'},
  { path: 'section/:sectionId/:topicId/:postId', redirectTo: '/section/:sectionId/:topicId/:postId(sidebar:topics)', pathMatch: 'full'},

  //basic routes to components
  { path: 'sections', component: SectionsPageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [BeforeLoginService] },
  { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AfterLoginService]  },
  { path: 'reqpwreset', component: RequestPasswordResetComponent, canActivate: [BeforeLoginService]  },
  { path: 'responsepwreset', component: ResponsePasswordResetComponent, canActivate: [BeforeLoginService]  },
  { path: 'section/:sectionId/:topicId', component: TopicPageComponent },
  { path: 'section/:sectionId/:topicId/:postId', component: PostPageComponent },

  //left sidebar routes
  {
    path: '',
    component: SideNavTopicsComponent,
    outlet: 'sidebar'
  },
  {
    path: 'topics',
    component: SideNavTopicsComponent,
    outlet: 'sidebar'
  },
  {
    path: 'news',
    component: SideNavNewsComponent,
    outlet: 'sidebar'
  },
  {
    path: 'rules',
    component: SideNavRulesComponent,
    outlet: 'sidebar'
  },
  {
    path: 'login',
    component: SideNavLoginComponent,
    outlet: 'sidebar'
  },

  // IF no match
  { path: '**', redirectTo: '/sections(sidebar:topics)' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
