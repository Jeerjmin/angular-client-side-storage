import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public data: any[];

  // Filters
  public compSetOptions = compSetOptions;
  public sourceOptions = sourceOptions;
  public priceOptions = priceOptions;
  public posOptions = posOptions;
  public losOptions = losOptions;
  public roomTypeOptions = roomTypeOptions;
  public mealTypeOptions = mealTypeOptions;

  // Filter data
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

  async search(
    year: number = 2019,
    compset_id: number = 1,
    provider_id: number = 2,
    los: number = 3,
  ) {
    this.data = await this.demoService.find(year, compset_id, provider_id, los);
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
  {id: 0, name: '1 Night'},
  {id: 1, name: '2 Night'},
  {id: 2, name: '5 Night'},
  {id: 3, name: '10 Night'},
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
