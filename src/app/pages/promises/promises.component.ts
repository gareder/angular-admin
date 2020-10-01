import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(users => console.log(users));

    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Inside the promise');
    //   } else {
    //     reject('Error inside the promise');
    //   }
    // });

    // promise.then(message => console.log(message))
    //        .catch(err => console.log('Problem in my promise', err));

    // console.log('Outside the promise');
  }

  getUsers() {
    return new Promise(resolve => {

      fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.json())
      .then(body => resolve(body.data));

    });
  }

}
