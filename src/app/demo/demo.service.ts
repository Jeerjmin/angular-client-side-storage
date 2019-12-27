import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class DemoService {
  constructor(
    private http: HttpClient
  ) {
  }


  public getData(url: string): Observable<any> {
    return this.http.get(url);
  }

}
