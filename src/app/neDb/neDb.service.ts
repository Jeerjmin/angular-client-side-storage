import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class NeDbService {
  constructor(
    private http: HttpClient
  ) {
  }


  public getData(): Observable<any> {
    return this.http.get(`http://localhost:3000/get-json`);
  }

}
