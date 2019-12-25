import { NgModule } from '@angular/core';
import { NeDbComponent } from './neDb.component';
import {NeDbService} from './neDb.service';
import {NeDbRoutingModule} from './neDb-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [
    NeDbComponent
  ],
  imports: [
    NeDbRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [
    NeDbService
  ],
  bootstrap: [NeDbComponent]
})
export class NeDbModule { }
