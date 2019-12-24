import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IndexedDbComponent} from './indexedDb.component';

const routes: Routes = [
  {
    path: '',
    component: IndexedDbComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexedDbRoutingModule {
}
