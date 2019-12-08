import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticlesRoutingModule} from './articles-routing.module';
import {ArticleComponent} from './article/article.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatNativeDateModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [ArticleComponent, ArticleListComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    QuillModule.forRoot()

  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class ArticlesModule {
}
