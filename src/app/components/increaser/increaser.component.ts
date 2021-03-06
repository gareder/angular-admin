import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('value') progress = 50; // if we want to rename the property to get the value form the parent element
  @Input() btnClass: string = 'btn-primary';
  @Output('value') outputValue: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      newValue = 100;
    } else if (newValue <= 100) {
      newValue = 0;
    }
    this.outputValue.emit(newValue);
  }

}
