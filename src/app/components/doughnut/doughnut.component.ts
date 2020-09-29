import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent {

  @Input() title: string = 'No title';

  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input('data') public doughnutChartData: MultiDataSet = [ [350, 450, 100] ];
  public doughnutChartType = 'doughnut';

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];

}
