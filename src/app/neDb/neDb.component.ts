import {ChangeDetectorRef, Component} from '@angular/core';
import * as Datastore from 'nedb';
import {NeDbService} from './neDb.service';

@Component({
  selector: 'app-root',
  templateUrl: './neDb.component.html',
  styleUrls: ['./neDb.component.css']
})
export class NeDbComponent {

  public data: any[];
  public number = 0;
  public url = 'http://f2f77693.ngrok.io/get-json';
  public db;
  public fetching = false;

  constructor(
    private neDbService: NeDbService,
    private cdr: ChangeDetectorRef,
  ) {

    this.db = new Datastore({filename: 'input7.json', autoload: true});


    this.db.loadDatabase(() => {

      this.db.find('', (err, data) => {

        if (err) {
          console.log(err);
        } else {
          console.log('data', data);
          this.data = data
          this.cdr.detectChanges();
        }

      });

    });


  }

  startFetch() {
    this.fetching = true;
    this.cdr.detectChanges();
    this.neDbService.getData(this.url).subscribe((asyncData) => {
      this.db.insert(asyncData, (insertErr, newDoc) => {
        console.log('err', insertErr);
        console.log('newDoc', newDoc);
        this.data = newDoc
        this.fetching = false;
        this.cdr.detectChanges();
      });
    });
  }

  find() {
    this.fetching = true;
    this.cdr.detectChanges();
    console.log('this.number', this.number)

    this.db.find({ id: { $gt: Number(this.number)}}, (err, data) => {
      console.log('data', data)
      this.data = data
      this.fetching = false;
      this.cdr.detectChanges();
    });
  }

  deleteAll() {
    this.fetching = true;
    this.cdr.detectChanges();

    this.db.remove({}, { multi: true }, (err, numRemoved) => {
      this.data = [];
      this.fetching = false;

      this.cdr.detectChanges();
    });
  }

}

