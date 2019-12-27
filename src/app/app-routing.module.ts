import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/demo/demo.module#DemoModule'
  },
  {
    path: 'nedb',
    loadChildren: 'src/app/neDb/neDb.module#NeDbModule',
  },
  {
    path: 'indexed-db',
    loadChildren: 'src/app/indexedDb/indexedDb.module#IndexedDbModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
