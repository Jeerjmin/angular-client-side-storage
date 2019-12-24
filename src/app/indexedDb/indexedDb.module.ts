import { NgModule } from '@angular/core';
import {IndexedDbComponent} from './indexedDb.component';
import {IndexedDbService} from './indexedDb.service';
import {IndexedDbRoutingModule} from './indexedDb-routing.module';

@NgModule({
  declarations: [
    IndexedDbComponent
  ],
  imports: [
    IndexedDbRoutingModule
  ],
  providers: [
    IndexedDbService
  ],
  bootstrap: [IndexedDbComponent]
})
export class IndexedDbModule { }
