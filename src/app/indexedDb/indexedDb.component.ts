import { Component } from '@angular/core';

const customerData = [
  { id: '444-44-4444', title: 'Bill', url: 'bill@company.com' },
  { id: '555-55-5555', title: 'Donna', url: 'donna@home.org' }
];

@Component({
  selector: 'app-root',
  templateUrl: './indexedDb.component.html',
})
export class IndexedDbComponent {

  constructor() {

    if (window.indexedDB) {
      const db = window.indexedDB.open('MyTestDatabase7', 3);

      db.onerror = function(event) {
        console.log('event error', event);
        // Сделать что-то при ошибке db.errorCode!
      };

      db.onupgradeneeded = function(event:any) {
        const db = event.target.result;
        console.log('onupgradeneededs', db)

        // Create an objectStore to hold information about our customers. We're
        // going to use "ssn" as our key path because it's guaranteed to be
        // unique.
        const objectStore = db.createObjectStore("customers", {keyPath: "id", autoIncrement: true});

        // Create an index to search customers by name. We may have duplicates
        // so we can't use a unique index.

        // Create an index to search customers by email. We want to ensure that
        // no two customers have the same email, so use a unique index.
        objectStore.createIndex("id", "id", { unique: false });

        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("url", "url", { unique: false });

        // Store values in the newly created objectStore.
        for (var i in customerData) {
          console.log('objectStore add')
          objectStore.add(customerData[i]);
        }
      };

      // @ts-ignore



      db.onsuccess = function(event: any) {

        console.log('event', event)

        const DB = event.target.result;

        const transaction = DB.transaction(["customers"]);
        const objectStore = transaction.objectStore("customers");
        const request = objectStore.get("444-44-4444");


        request.onsuccess = (e) => {
          console.log('e', request.result )
        }


        // Do something with the request.result!


      };

    } else {
      window.alert('Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны');

    }


  }


}
