import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() index: number;
  
  constructor( 
    private iab : InAppBrowser, 
    private platform : Platform, 
    private actionSheetCtrl : ActionSheetController, 
    private socialSharing : SocialSharing,
    private storageService : StorageService) { }


  openArticle(){
    if( this.platform.is('ios') || this.platform.is('android') ){
      const browser = this.iab.create( this.article.url)
      browser.show();
    return;
    }
  
    window.open( this.article.url, '_blank');
  
  
  }

  async openMenu(){

    const normalButtons : ActionSheetButton[] = [
      {
        text:'Favorito',
        icon: 'heart-outline',
        handler : ()=> this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        //cssClass:'secondary'
      }
    ];

    const shareBtn: ActionSheetButton = {
      text:'Compartir',
      icon: 'share-outline',
      handler : () => this.onShareArticle()
    };

    if (this.platform.is('capacitor')){
     // actionSheet.buttons.unshift(share)
     normalButtons.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header:'Opciones',
      buttons:normalButtons
        /* {
          text:'Compartir',
          icon: 'share-outline',
          handler : () => this.onShareArticle()
        }, */
        
      
    });

    

    //console.log('estamos en capacitor:' + this.platform.os)

    

    await actionSheet.present();
  }



  onShareArticle() {
    //console.log('Share article')
    const {title, source, url} = this.article;

    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  onToggleFavorite(){
    //console.log('Toggle favorite')
    this.storageService.saveRemoveArticle(this.article)
  }

}
