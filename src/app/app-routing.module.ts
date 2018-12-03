import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'freightform',
    pathMatch: 'full'
  },
  { path: 'freightform', loadChildren: './pages/freightform/freightform.module#FreightformPageModule' },
  { path: 'freightlist', loadChildren: './pages/freightlist/freightlist.module#FreightlistPageModule' },
  { path: 'contracts', loadChildren: './pages/contracts/contracts.module#ContractsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
