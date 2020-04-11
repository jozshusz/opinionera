import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicsPageComponent } from './topics-page/topics-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { SideNavTopicsComponent } from './side-nav-topics/side-nav-topics.component';
import { SideNavNewsComponent } from './side-nav-news/side-nav-news.component';
import { SideNavRulesComponent } from './side-nav-rules/side-nav-rules.component';
import { SideNavLoginComponent } from './side-nav-login/side-nav-login.component';


const routes: Routes = [
  { path: '', redirectTo: '/topics(sidebar:topics)', pathMatch: 'full'},
  { path: 'topics', redirectTo: '/topics(sidebar:topics)', pathMatch: 'full'},
  { path: 'news', redirectTo: '/news(sidebar:news)', pathMatch: 'full'},
  { path: 'rules', redirectTo: '/rules(sidebar:rules)', pathMatch: 'full'},
  { path: 'login', redirectTo: '/login(sidebar:login)', pathMatch: 'full'},
  { path: 'topics', component: TopicsPageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'login', component: LoginPageComponent },
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
