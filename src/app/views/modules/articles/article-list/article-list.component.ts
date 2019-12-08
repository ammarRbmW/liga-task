import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from '../../../../core/models';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ArticleService} from '../../../../core/services/article.service';
import {DeleteDialogComponent} from '../../../shared/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];

  displayedColumns: string[] = ['image', 'title', 'date', 'action'];
  dataSource = new MatTableDataSource(this.articles);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private articleService: ArticleService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.articles = this.articleService.list();
    this.dataSource = new MatTableDataSource(this.articles);
    this.dataSource.sort = this.sort;
  }

  delete(item, index) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.articleService.delete(item);
        const temp = [...this.articles];
        temp.splice(index, 1);
        this.articles = temp;
        this.dataSource = new MatTableDataSource(this.articles);
        this.snackBar.open(
          'Item deleted successfully.', 'success',
          {
            duration: 2000,
          });
      }
    });
  }
}
