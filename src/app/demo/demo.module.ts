import { NgModule } from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, MatTabsModule} from '@angular/material';
import {DemoComponent} from './demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {DemoService} from './demo.service';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    DemoRoutingModule,
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
    DemoService
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule { }
