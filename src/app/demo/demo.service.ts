import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class DemoService {
  constructor(
    private http: HttpClient
  ) {
  }


  public getData(): Observable<any> {
    return this.http.post('https://ci-server-demo.herokuapp.com/structure-generate', {
      year: 2019,
      month: 10,
      base_price: 100,
      high_diff: {from: 20, to: 40 },
      mid_diff: {from: 10, to: 15 },
      low_diff: {from: -10, to: -15 },
      no_of_pos: 3,
      no_of_providers: 5,
      no_of_rates: 2,
      room_price: 100,
      no_of_los: 3
    });
  }

}
