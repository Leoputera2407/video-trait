import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-result',
  segment: 'result/:id'
})
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  id: string;
  result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.id = navParams.data.id;
  }

  handleResult() {

  }

  ionViewDidLoad() {
      this.result = "ISFP" // debug
    this.storage.get('result')
    .then(result => {
      this.result = result;
      console.log(result);
      this.handleResult();
    });
  }

}
