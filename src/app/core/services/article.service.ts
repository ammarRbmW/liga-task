import {Injectable} from '@angular/core';

import {Article} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor() {
    this.addData();
  }

  addData() {
    if (this.list()) {
      return false;
    }
    const articles: Article[] = [];
    for (let i = 1; i < 11; i++) {
      const today = new Date();
      const randomNumber = Math.floor(1 + Math.random() * (12 + 1 - 1));
      const randomDate = new Date(today.getFullYear(), today.getMonth() - randomNumber, 0);
      const article: Article = {
        id: i,
        title: 'Lorem Ipsum',
        content: '<p>Lorem ipsum is placeholder text ' +
          'commonly used in the graphic, print, and publishing ' +
          'industries for previewing layouts and visual mockups.</p>',
        image: `https://picsum.photos/id/${i}/200`,
        date: randomDate
      };
      articles.push(article);
    }
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  incrementId(): number {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const maxId = Math.max.apply(Math, articles.map((o) => {
      return o.id;
    }));

    return Number(maxId) + 1;
  }

  list(): Article[] {
    return JSON.parse(localStorage.getItem('articles'));
  }

  get(id): Article {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const article = articles.find(articleTemp => articleTemp.id == id);
    return article;
  }

  add(article: Article): Article {
    const articles = JSON.parse(localStorage.getItem('articles'));
    article.id = this.incrementId();
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));

    return article;
  }

  update(article: Article): Article {

    const articles = JSON.parse(localStorage.getItem('articles'));
    const index = articles.findIndex(articleTemp => articleTemp.id == Number(article.id));

    articles[index] = article;
    localStorage.setItem('articles', JSON.stringify(articles));

    return article;
  }

  delete(articleId) {

    const articles = JSON.parse(localStorage.getItem('articles'));
    const articleDelete = articles.find(articleTemp => articleTemp.id === articleId);
    const index: number = articles.indexOf(articleDelete);

    if (index !== -1) {

      articles.splice(index, 1);
      localStorage.setItem('articles', JSON.stringify(articles));
      return true;

    }

    return false;
  }

}
