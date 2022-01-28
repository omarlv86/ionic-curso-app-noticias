import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators'

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private hhtp: HttpClient) { }

  getTopHeadLines():Observable<Article[]>{

    return this.hhtp.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params: {
        //apiKey: apiKey
        apiKey //mejorando la respuesta
      }
    }).pipe(
      //map( (resp) => resp.articles)
      map( ({ articles }) => articles ) //mejorando respuesta
    );
  }

  getTopHeadLinesByCategory( category: string ):Observable<Article[]>{
    return this.hhtp.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`, {
      params: {
        apiKey 
      }
    }).pipe(
      map( ({ articles }) => articles ) 
    );
  }
}
