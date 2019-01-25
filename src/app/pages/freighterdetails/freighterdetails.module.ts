import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FreighterdetailsPage } from './freighterdetails.page';

const routes: Routes = [
  {
    path: '',
    component: FreighterdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FreighterdetailsPage]
})
export class FreighterdetailsPageModule {}
