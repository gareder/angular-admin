import { Component } from '@angular/core';



@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styles: [
  ]
})
export class Chart1Component {

  public labels1: string[] = ['Mouses', 'Keyboards', 'Headphones'];
  public data1 = [ [200, 200, 200] ];

}
