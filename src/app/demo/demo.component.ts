import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public data: any[];
  public days = Array(35).fill(undefined);

  // Filters data
  public compSetOptions = compSetOptions;
  public sourceOptions = sourceOptions;
  public priceOptions = priceOptions;
  public posOptions = posOptions;
  public losOptions = losOptions;
  public roomTypeOptions = roomTypeOptions;
  public mealTypeOptions = mealTypeOptions;

  // Filter
  public year;
  public month;
  public compSet;
  public source;
  public price;
  public pos;
  public los;
  public roomType;
  public mealType;

  constructor(
    private demoService: DemoService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  async ngOnInit() {
    await this.demoService.initDataFromServer();
  }

  async search() {
    this.data = await this.demoService.find({
      year: this.year,
      month: this.month,
      los: this.los,
      compset_id: this.compSet.id,
      provider_id: this.source.id,
    });
  }

  getDay() {
    return new Date(this.data[0].year, this.data[0].month - 1).getDay();
  }
}

const compSetOptions = [
  {id: 0, name: 'Low'},
  {id: 1, name: 'Median'},
  {id: 2, name: 'High'},
];

const sourceOptions = [
  {id: 0, name: 'Booking.com'},
  {id: 1, name: 'Hotels.com'},
  {id: 2, name: 'Airbnb.com'},
  {id: 3, name: 'Trivago.com'},
];

const priceOptions = [
  {id: 0, name: 'Best flex'},
];

const posOptions = [
  {id: 0, name: 'EU'},
  {id: 1, name: 'UK'},
  {id: 2, name: 'USA'},
  {id: 3, name: 'RU'},
];

const losOptions = [
  {value: 1, name: '1 Night'},
  {value: 2, name: '2 Night'},
  {value: 5, name: '5 Night'},
  {value: 10, name: '10 Night'},
];

const roomTypeOptions = [
  {id: 0, name: 'All'},
  {id: 1, name: '1 type'},
  {id: 2, name: '2 type'},
  {id: 3, name: '3 type'},
];

const mealTypeOptions = [
  {id: 0, name: 'All'},
  {id: 1, name: 'None'},
  {id: 2, name: 'Half'},
  {id: 3, name: 'Breakfast'},
  {id: 4, name: 'Full'},
];
