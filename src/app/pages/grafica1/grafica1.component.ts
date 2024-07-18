import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrl: './grafica1.component.css',
})
export class Grafica1Component {
  public labels1: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public labels2: string[] = ['labels', 'labels', 'labels'];
  public labels3: string[] = ['EMAIL', 'EMAIL', 'EMAIL'];
  public labels4: string[] = ['Price', 'Price', 'Price'];

  public data1: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [350, 450, 100], label: 'Series A' }];

  public data2: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [20, 80, 200], label: 'Series B' }];

  public data3: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [500, 200, 100], label: 'Series C' }];

  public data4: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [400, 20, 320], label: 'Series D' }];
}
