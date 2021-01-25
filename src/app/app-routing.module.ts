import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {ResultPageComponent} from './pages/result-page/result-page.component';
import {HowPageComponent} from './pages/how-page/how-page.component';

const routes: Routes = [
  {path: 'how', component: HowPageComponent},
  {path: 'result/:group', component: ResultPageComponent},
  {path: '', component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
