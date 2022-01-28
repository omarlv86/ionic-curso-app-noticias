import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NewsResponse } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private newServive: NewsService) {}

  ngOnInit(): void {
      this.newServive.getTopHeadLines()
      .subscribe( articles => {
        console.log( articles )
      })
  }
}
