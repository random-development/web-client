import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage.component';
import { MetricModule } from './metric/metric.module';
import { Route, RouterModule } from '@angular/router';
import { ComplexModule } from './complex/complex.module';
import { MetricComponent } from './metric/metric.component';
import { ComplexComponent } from './complex/complex.component';
import { MonitorsService } from './monitors/monitors.service';

const routes: Route[] = [
  {
      path: '',
      component: MainpageComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: MetricComponent
        },
        {
          path: 'complex',
          component: ComplexComponent
        }
      ]
  }
];

@NgModule({
  declarations: [
    MainpageComponent
  ],
  providers: [
    MonitorsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MetricModule,
    ComplexModule
  ],
  exports: [
    MainpageComponent,
    RouterModule
  ]
})
export class MainpageModule { }
