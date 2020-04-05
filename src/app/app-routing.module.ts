import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TopicsPageComponent } from './topics-page/topics-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'topics', component: TopicsPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'login', component: LoginPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
