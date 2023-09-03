import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DeviceListComponent },
  { path: 'devices/:deviceId', component: DeviceDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', redirectTo: '' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
