import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { YoutubeProvider } from '../../providers/youtube/youtube';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private youtubePvd: YoutubeProvider) {
  }

  ionViewDidLoad() {
    this.storage.get('youtubeToken')
    .then(token => {
      this.youtubePvd.sendToken(token)
      .subscribe(data => {
        console.log(data);
        this.storage.set('result', JSON.stringify(data));
        this.navCtrl.push('ResultPage');
      });
    });
  }

}
