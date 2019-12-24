import {RouterModule, Routes} from '@angular/router';
import {NeDbComponent} from './neDb.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: NeDbComponent
  },
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeDbRoutingModule {
}
