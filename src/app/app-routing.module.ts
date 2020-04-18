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


const routes: Routes = [
  //the sidebar stays in place
  { path: '', redirectTo: '/sections(sidebar:topics)', pathMatch: 'full'},
  { path: 'sections', redirectTo: '/sections(sidebar:topics)', pathMatch: 'full'},
  { path: 'news', redirectTo: '/news(sidebar:news)', pathMatch: 'full'},
  { path: 'rules', redirectTo: '/rules(sidebar:rules)', pathMatch: 'full'},
  { path: 'login', redirectTo: '/login(sidebar:login)', pathMatch: 'full'},
  { path: 'section/:sectionId/:topicId', redirectTo: '/section/:sectionId/:topicId(sidebar:topics)', pathMatch: 'full'},
  { path: 'section/:sectionId/:topicId/:postId', redirectTo: '/section/:sectionId/:topicId/:postId(sidebar:topics)', pathMatch: 'full'},

  //basic routes to components
  { path: 'sections', component: SectionsPageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'login', component: LoginPageComponent },
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
