import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FreightformPage } from './freightform.page';
import { TransportComponent } from './transport/transport.component';
import { RepairComponent } from './repair/repair.component';
import { CraneComponent } from './crane/crane.component';

const routes: Routes = [
  {
    path: '',
    component: FreightformPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FreightformPage, TransportComponent, RepairComponent, CraneComponent]
})
export class FreightformPageModule {}
