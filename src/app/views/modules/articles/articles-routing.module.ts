import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleComponent} from './article/article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
  }, {
    path: 'create',
    component: ArticleComponent,
  }, {
    path: 'edit/:articleId',
    component: ArticleComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
