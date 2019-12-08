import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ArticleService} from '../../../../core/services/article.service';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageFormValidator} from '../../../../core/validation/image-form-validator';
import maxSize = ImageFormValidator.maxSize;
import {Article} from '../../../../core/models';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {

  public form: FormGroup;
  isItemEdit = false;
  article: Article;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      if (this.router.url.includes('/edit')) {
        this.id = params.articleId;
        this.isItemEdit = true;
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      content: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      date: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      image: [null, Validators.compose([maxSize(200)])],
    });

    if (this.isItemEdit) {
      this.getArticle();
    }
  }

  getArticle() {
    this.article = this.articleService.get(this.id);
    if (this.article) {
      this.form.patchValue(this.article);
    }
  }

  submit() {

    const data = this.form.value;
    let result = null;

    if (this.isItemEdit) {

      data.id = this.id;
      result = this.articleService.update(data);
    } else {
      result = this.articleService.add(data);
    }
    if (result) {
      this.snackBar.open(
        'Item created successfully.', 'success',
        {
          duration: 2000,
        });
      this.form.reset();
      this.router.navigate([`/articles`]);

    } else {
      this.snackBar.open(
        'Something was wrong', 'Error',
        {
          duration: 2000,
        });
    }
  }
}
