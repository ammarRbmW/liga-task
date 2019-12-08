import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlankComponent} from './views/shared/layout/blank/blank.component';
import {FullComponent} from './views/shared/layout/full/full.component';
import {AuthGuard, NoAuthGuard} from './core/guard';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    canActivate: [NoAuthGuard],
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./views/auth/auth.module').then(mod => mod.AuthModule)
      }
    ]
  }, {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'articles',
        loadChildren: () => import('./views/modules/articles/articles.module').then(mod => mod.ArticlesModule)
      }, {
        path: 'user',
        loadChildren: () => import('./views/modules/user/user.module').then(mod => mod.UserModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
