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
  public db;

  constructor(
    private neDbService: NeDbService,
    private cdr: ChangeDetectorRef,
  ) {

    this.db = new Datastore({filename: 'input5.json', autoload: true});


    this.db.loadDatabase(() => {

      this.db.find('', (err, data) => {

        if (err) {
          console.log(err);
        } else if (data && data.length === 0) {

          neDbService.getData().subscribe((asyncData) => {
            this.db.insert(asyncData, (insertErr, newDoc) => {
              console.log('err', insertErr);
              console.log('newDoc', newDoc);
              this.data = newDoc.slice(0, 30000);
              this.cdr.detectChanges();
            });
          });

        } else {
          console.log('data', data);
          this.data = data.slice(0, 30000);
          this.cdr.detectChanges();
        }

      });

    });


  }

  find() {

    console.log('this.number', this.number)

    this.db.find({ id: { $gt: Number(this.number)}}, (err, data) => {
      console.log('data', data)
      this.data = data.slice(0, 30000);
      this.cdr.detectChanges();
    });
  }

}

