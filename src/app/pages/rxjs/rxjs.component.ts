import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {
  public intervalSubsc: Subscription;

  constructor() {

    // this.returnsObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   value => console.log('Subs: ', value),
    //   err => console.warn('Error: ', err),
    //   () => console.log('Obs$ completed')
    // );
    this.intervalSubsc = this.returnsInterval().subscribe(console.log); // ((value) => console.log(value));
  }
  ngOnDestroy(): void {
    this.intervalSubsc.unsubscribe();
  }

  returnsInterval(): Observable<number> {
    // take to tell how many times we want the observable to emit something
    return interval(100)
           .pipe(
            //  take(10),
             map(value => value + 1), // 0 => 1
             filter(value => (value % 2 === 0) ? true : false),
           );

  }

  returnsObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>(observer => {

    const interval = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('i equals 2');
        }

      }, 1000);

    });
  }


}
