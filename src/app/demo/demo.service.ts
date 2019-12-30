import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Datastore from 'nedb';

export interface SearchInterface {
  compset_id: 0 | 1 | 2;
  provider_id: number;
  los: number;
}

@Injectable()
export class DemoService {
  public days = Array(35).fill(undefined);
  public db;

  constructor(
    private http: HttpClient
  ) {
    this.db = new Datastore({ filename: 'calendar.json', autoload: true });
  }

  public initDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.count({},  (err1, count) => {
        if (err1) {
          console.error(err1);
          return reject(err1);
        }

        if (count) {
          return resolve(count);
        }

        this.db.remove({}, { multi: true }, (err2, numRemoved) => {
          if (err2) {
            console.error(err2);
            return reject(err2);
          }
          // tslint:disable-next-line:no-console
          console.info('numRemoved', numRemoved);
          this.db.persistence.compactDatafile();
          // this.db.compactDatafile();

          this.http.post('https://ci-server-demo.herokuapp.com/structure-generate', {
            year: 2019,
            month: 10,
            base_price: 100,
            high_diff: {from: 20, to: 40 },
            mid_diff: {from: 10, to: 15 },
            low_diff: {from: -10, to: -15 },
            no_of_pos: 3,
            no_of_providers: 5,
            no_of_rates: 70,
            room_price: 100,
            no_of_los: 8
          }).subscribe((data: []) => {
            this.db.insert(data);
            // tslint:disable-next-line:no-console
            console.info('inserted data', data);
            return resolve(data.length);
          });
        });
      });
    });
  }

  public async find(params: SearchInterface): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.find(params).skip(0).limit(10).exec((err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        console.log('data', data);
        resolve(data);
      });
    });
  }
}
