import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DemoService} from './demo.service';
import {find} from 'lodash';

interface IData {
  year: string;
  month: string;
  compset_id: number;
  provider_id: number;
  los: number;
  checkin_dates: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public data: IData;
  public days = Array(35).fill(undefined);
  public fetching = false;

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
    this.fetching = true;
    await this.demoService.initDataFromServer();
    this.fetching = false;
  }

  async search() {
    [this.data] = await this.demoService.find(this.compSet, this.source, this.los);

    this.data.checkin_dates = this.data.checkin_dates.map((el, i) => {
      const customerRates = find(el.room_types.customer_rates, { room_rate_name_id: this.roomType, meal_plan: this.mealType  });
      const competitorRates = find(el.room_types.competitors_rates, { room_rate_name_id: this.roomType, meal_plan: this.mealType  });

      return {
        ...el,
        room_types: {
          ...el.room_types,
          customer_rates: customerRates,
          competitors_rates: competitorRates
        },
      };
    });

    console.log('lodash data', this.data)

  }

  comparePrices(roomTypes) {

    const cusPrice = roomTypes.customer_rates.price;
    const comPrice = roomTypes.competitors_rates.price;

    return Math.round((comPrice - cusPrice) / cusPrice * 100);
  }

  getDay() {
    return new Date(Number(this.data.year), Number(this.data.month) - 1).getDay();
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
  {id: 0, name: '1 type'},
  {id: 1, name: '2 type'},
  {id: 2, name: '3 type'},
];

const mealTypeOptions = [
  {value: 'NONE', name: 'None'},
  {value: 'HALF', name: 'Half'},
  {value: 'BREAKFAST', name: 'Breakfast'},
  {value: 'FULL', name: 'Full'},
];
