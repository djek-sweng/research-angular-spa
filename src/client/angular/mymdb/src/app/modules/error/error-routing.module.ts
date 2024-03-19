import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorGenericComponent } from './components/error-generic/error-generic.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: ErrorGenericComponent,
    data: { message: '404 Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule {}
