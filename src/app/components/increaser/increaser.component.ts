import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent {

  // @Input('value') progress = 50; if we want to rename the property to get the value form the parent element
  @Input() progress = 50;

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
