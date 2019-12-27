import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public data: any[];
  public days = Array(35).fill(undefined);

  constructor(
    private demoService: DemoService,
  ) {
  }

  ngOnInit(): void {
    this.demoService.getData().subscribe((data) => {
      this.data = data;
      console.log('data', data)
      this.getDay()
    });
  }

  getDay() {
    const day = new Date(this.data[0].year, this.data[0].month - 1).getDay()
    console.log('day', day)
    return day
  }


}

