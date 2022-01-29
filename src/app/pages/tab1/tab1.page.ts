import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;


  public articles : Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
      /* this.newServive.getTopHeadLines()
      .subscribe( articles => {
        this.articles.push( ...articles ) //insertando los datos a public articles
        //this.articles = [ ...articles, ...this.articles ]; //otra forma de insertar los datos
      } ) */
      this.newsService.getTopHeadlines()
      .subscribe( articles => this.articles.push( ...articles ) );
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory( 'business', true )
      .subscribe( articles => {
        
          if ( articles.length === this.articles.length ) {
            this.infiniteScroll.disabled = true;
            // event.target.disabled = true;
            return;
          }


          this.articles = articles;
          this.infiniteScroll.complete();
          // event.target.complete();    
         

        })

    }
}
