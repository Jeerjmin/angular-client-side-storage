import { NgModule } from '@angular/core';
import { NeDbComponent } from './neDb.component';
import {NeDbService} from './neDb.service';
import {NeDbRoutingModule} from './neDb-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    NeDbComponent
  ],
  imports: [
    NeDbRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    NeDbService
  ],
  bootstrap: [NeDbComponent]
})
export class NeDbModule { }
