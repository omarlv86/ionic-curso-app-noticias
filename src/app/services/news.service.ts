import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators'
import { ArticlesByCategoryAndPage } from '../interfaces/index';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { 
        apiKey: apiKey,
        country: 'us',
      }
    })
  }
  /* Codigo Antiguo  */
  /* getTopHeadLines():Observable<Article[]>{

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params: {
        //apiKey: apiKey
        apiKey //mejorando la respuesta
      }
    }).pipe(
      //map( (resp) => resp.articles)
      map( ({ articles }) => articles ) //mejorando respuesta
    );
  } */

  getTopHeadlines():Observable<Article[]> {

    return this.getTopHeadlinesByCategory('business');
    // return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
    //   .pipe(
    //     map( ({ articles }) => articles )
    //   );

  }
  /* Codigo Antiguo sin explicacion */
  /* getTopHeadLinesByCategory( category: string ):Observable<Article[]>{

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`, {
      params: {
        apiKey 
      }
    }).pipe(
      map( ({ articles }) => articles ) 
    );

  } */

  getTopHeadlinesByCategory( category: string, loadMore: boolean = false ):Observable<Article[]> {

    if ( loadMore ) {
      return this.getArticlesByCategory( category );
    }

    if ( this.articlesByCategoryAndPage[category] ) {
      return of(this.articlesByCategoryAndPage[category].articles); //of permite crear un observable a partir de la data 
    }

    return this.getArticlesByCategory( category );
   
  }

  private getArticlesByCategory( category: string ): Observable<Article[]> {

 

    if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
      // Ya existe
      // this.articlesByCategoryAndPage[category].page += 0;
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe(
      map( ({ articles }) => {

        if ( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  

  }
}
