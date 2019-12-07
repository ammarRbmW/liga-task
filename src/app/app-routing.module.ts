import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlankComponent} from './views/shared/layout/blank/blank.component';
import {FullComponent} from './views/shared/layout/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./views/auth/auth.module').then(mod => mod.AuthModule)
      }
    ]
  }, {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'articles',
        loadChildren: () => import('./views/modules/articles/articles.module').then(mod => mod.ArticlesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
