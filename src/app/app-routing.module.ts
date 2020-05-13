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
import { OthersProfileComponent } from './others-profile/others-profile.component';
import { SearchPageComponent } from './search-page/search-page.component';


const routes: Routes = [
  //the sidebar stays in place
  { path: '', redirectTo: '/sections/all(sidebar:topics)', pathMatch: 'full'},
  { path: 'sections', redirectTo: '/sections/all(sidebar:topics)', pathMatch: 'full'},
  { path: 'search/:keyword', redirectTo: '/search/:keyword(sidebar:topics)', pathMatch: 'full'},
  { path: 'news', redirectTo: '/news/all(sidebar:news)', pathMatch: 'full'},
  { path: 'rules', redirectTo: '/rules/all(sidebar:rules)', pathMatch: 'full'},
  { path: 'login', redirectTo: '/login(sidebar:login)', pathMatch: 'full'},
  { path: 'signup', redirectTo: '/signup(sidebar:login)', pathMatch: 'full'},
  { path: 'profile', redirectTo: '/profile(sidebar:topics)', pathMatch: 'full'},
  { path: 'profile/:userId', redirectTo: '/profile/:userId(sidebar:topics)', pathMatch: 'full'},
  { path: 'reqpwreset', redirectTo: '/reqpwreset(sidebar:login)', pathMatch: 'full'},
  //{ path: 'responsepwreset', redirectTo: '/responsepwreset(sidebar:login)', pathMatch: 'full'},
  { path: 'section/:sectionId/:topicId', redirectTo: '/section/:sectionId/:topicId(sidebar:topics)', pathMatch: 'full'},
  { path: 'section/:sectionId/:topicId/:postId', redirectTo: '/section/:sectionId/:topicId/:postId(sidebar:topics)', pathMatch: 'full'},

  //basic routes to components
  { path: 'sections', component: SectionsPageComponent },
  { path: 'sections/all', component: SectionsPageComponent },
  { path: 'sections/fresh', component: SectionsPageComponent },
  { path: 'sections/popular', component: SectionsPageComponent },
  { path: 'search/:keyword', component: SearchPageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'news/all', component: NewsPageComponent },
  { path: 'news/announce', component: NewsPageComponent },
  { path: 'news/repairs', component: NewsPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'rules/all', component: RulesPageComponent },
  { path: 'rules/faqs', component: RulesPageComponent },
  { path: 'rules/contact', component: RulesPageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [BeforeLoginService] },
  { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AfterLoginService]  },
  { path: 'profile/:userId', component: OthersProfileComponent },
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
  { path: '**', redirectTo: '/sections/all(sidebar:topics)' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
