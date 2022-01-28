import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles : Article[] = [];

  constructor(private newServive: NewsService) {}

  ngOnInit(): void {
      this.newServive.getTopHeadLines()
      .subscribe( articles => {
        this.articles.push( ...articles ) //insertando los datos a public articles
        //this.articles = [ ...articles, ...this.articles ]; //otra forma de insertar los datos
      } )
  }
}
