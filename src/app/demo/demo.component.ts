import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import * as Datastore from 'nedb';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  public data: any[];
  public count: number;
  public url = 'https://d19e712e.ngrok.io/get-json';
  public db;
  public fetching = false;

  public number = 0;
  public attribute;
  public value;

  public timeDbLoad: any;
  public timeDataLoad: any;
  public timeDataCount: any;

  displayedColumns: string[] = ['id', 'name', 'work', 'email', 'dob', 'address', 'city'];
  public pageSizeOptions: number[] = [10, 20, 100, 1000, 10000, 50000, 100000, 200000];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]);

  constructor(
    private demoService: DemoService,
    private cdr: ChangeDetectorRef,
  ) {

    // this.db = new Datastore({filename: 'input7.json', autoload: true});
    //
    // this.timeDbLoad = new Date().getTime();
    //
    // this.db.loadDatabase(() => {
    //   this.timeDbLoad = new Date().getTime() - this.timeDbLoad;
    //   this.timeDataLoad = new Date().getTime();
    //
    //   this.db.find({}).skip(0).limit(10).exec( (err, data) => {
    //
    //     if (err) {
    //       console.log(err);
    //     } else {
    //
    //       this.timeDataLoad = new Date().getTime() - this.timeDataLoad;
    //       this.timeDataCount = new Date().getTime();
    //       // tslint:disable-next-line:no-shadowed-variable
    //       this.db.count({},  (err, count) => {
    //         this.timeDataCount = new Date().getTime() - this.timeDataCount;
    //
    //         console.log('data', data);
    //         this.data = data;
    //         this.count = count;
    //         this.dataSource.data = [...data];
    //
    //         this.cdr.detectChanges();
    //       });
    //
    //
    //     }
    //
    //   });
    //
    // });


  }

  startFetch() {
    this.fetching = true;
    this.cdr.detectChanges();
    this.demoService.getData(this.url).subscribe((asyncData) => {
      this.db.insert(asyncData, (insertErr, newDoc) => {
        console.log('err', insertErr);
        this.getData(this.paginator);
        console.log('startFetch end');
        this.cdr.detectChanges();
      });
    }, () => {
      this.fetching = false;
      alert('Error fetch');
    });

  }

  findAttribute() {
    this.fetching = true;
    this.cdr.detectChanges();

    this.timeDataLoad = new Date().getTime();

    let searchQuery = {};
    if (this.attribute.toLowerCase() === 'id' || this.attribute.toLowerCase() === 'dob') {
      searchQuery[`${this.attribute}`] = Number(this.value);
    } else if (this.attribute.toLowerCase() === 'name' ||
      this.attribute.toLowerCase() === 'work' ||
      this.attribute.toLowerCase() === 'email' ||
      this.attribute.toLowerCase() === 'address' ||
      this.attribute.toLowerCase() === 'city') {
      searchQuery[`${this.attribute}`] = String(this.value);
    }

    if (!this.value || this.value === '') {
      searchQuery = {};
    }

    console.log('this.value', this.value)

    this.db.find(searchQuery)
      .skip(this.paginator ? this.paginator.pageIndex : 0)
      .limit(this.paginator ? this.paginator.pageSize : 10)
      .exec( (err, data) => {

        if (!err && data) {

          this.timeDataLoad = new Date().getTime() - this.timeDataLoad;
          this.timeDataCount = new Date().getTime();

          this.db.count(searchQuery,  (err, count) => {
            console.log('data', data);
            this.timeDataCount = new Date().getTime() - this.timeDataCount;

            this.fetching = false;
            this.data = data;
            this.count = count;
            this.dataSource.data = [...data];

            this.cdr.detectChanges();
          });
        }

      });
  }

  deleteAll() {
    this.fetching = true;
    this.cdr.detectChanges();

    this.db.remove({}, { multi: true }, (err, numRemoved) => {

      this.data = [];
      this.count = 0;
      this.dataSource.data = [];
      this.fetching = false;
      this.cdr.detectChanges();

      this.db.persistence.compactDatafile();
      this.db.compactDatafile();

    });
  }

  public getData(paginator?) {
    if (paginator) {
      this.paginator = paginator;

      this.timeDataLoad = new Date().getTime();

      this.db.find({}).skip(paginator.pageIndex).limit(paginator.pageSize).exec((err, data) => {
        if (!err && data) {

          this.timeDataLoad = new Date().getTime() - this.timeDataLoad;
          this.timeDataCount = new Date().getTime();

          this.db.count({},  (err, count) => {
            this.timeDataCount = new Date().getTime() - this.timeDataCount;

            console.log('data', data);
            this.data = data;
            this.count = count;
            this.dataSource.data = [...data];

            this.cdr.detectChanges();
          });

        }
      });
    } else {
      this.db.find({}).skip(0).limit(10).exec((err, data) => {
        if (!err && data) {

          this.db.count({},  (err, count) => {
            console.log('data', data);
            this.data = data;
            this.count = count;
            this.dataSource.data = [...data];

            this.cdr.detectChanges();
          });

        }
      });

    }

    this.fetching = false;

  }


}

