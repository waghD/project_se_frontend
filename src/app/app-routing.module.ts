import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'freightform', loadChildren: './pages/freightform/freightform.module#FreightformPageModule' },
  { path: 'freighters', loadChildren: './pages/resultlist/resultlist.module#ResultlistPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: '**', loadChildren: './pages/pagenotfound/pagenotfound.module#PagenotfoundPageModule' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
