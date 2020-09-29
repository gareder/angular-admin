import { Component } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent {

  progress = 50;

  get getPercent() {
    return `${ this.progress }%`;
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      return this.progress = 0;
    }

    this.progress = this.progress + value;
  }

}
