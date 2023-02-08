import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
