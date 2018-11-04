import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  result: any;
  introvert: boolean;
  observant: boolean;
  feeling: boolean;
  prospecting: boolean;
  uniqueID: number;
  seed: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }
    
  handleResult() {
      this.introvert = this.result[0] == 'I';
      this.observant = this.result[1] == 'S';
      this.feeling = this.result[2] == 'F';
      this.prospecting = this.result[3] == 'P';
      document.getElementById("mind").querySelector('.trait-label').innerHTML = this.introverted ? "<b>I</b>NTROVERTED" : "<b>E</b>XTROVERTED";
      document.getElementById("energy").querySelector('.trait-label').innerHTML = this.observant ? "OB<b>S</b>ERVANT" : "I<b>N</b>TUITIVE";
      document.getElementById("nature").querySelector('.trait-label').innerHTML = this.feeling ? "<b>F</b>EELING" : "<b>T</b>HINKING";
      document.getElementById("tactics").querySelector('.trait-label').innerHTML = this.prospecting ? "<b>P</b>ROSPECTING" : "<b>J</b>UDGING";
      this.storage.get("facebookToken").then(fbTok => {this.storage.get("youtubeToken").then(youtubeTok => {this.storage.get("redditToken").then(redditTok => {
          
      var res = 1;
      fbTok = "marcus" // TESTING!!!
      if(fbTok != null)
          for(var x = 0; x < 6; x++)
              res += fbTok[x].charCodeAt(0) * Math.pow(10,x);
      if(youtubeTok != null)
          for(var x = 0; x < 6; x++)
              res += youtubeTok[x].charCodeAt(0) * Math.pow(10,x);
      if(redditTok != null)
          for(var x = 0; x < 6; x++)
              res += redditTok[x].charCodeAt(0) * Math.pow(10,x);
      this.storage.set("uniqueID", res);
      this.uniqueID = res;
      this.seed = res;
      })})})
      document.getElementById("mind").querySelector('.percent').innerHTML = ((51 + Math.sqrt(100 * this.random())).toString().substring(0, 2) + "% ") + (this.introverted ? "introverted" : "extroverted") + "!";
      document.getElementById("energy").querySelector('.percent').innerHTML = ((51 + Math.sqrt(100 * this.random())).toString().substring(0, 2) + "% ") + (this.observant ? "observant" : "intuitive") + "!";
      document.getElementById("nature").querySelector('.percent').innerHTML = ((51 + Math.sqrt(100 * this.random())).toString().substring(0, 2) + "% ") + (this.feeling ? "feeling" : "thinking") + "!";
      document.getElementById("tactics").querySelector('.percent').innerHTML = ((51 + Math.sqrt(100 * this.random())).toString().substring(0, 2) + "% ") + (this.prospecting ? "prospecting" : "judging") + "!";
      
  }
    
    random() {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

  ionViewDidLoad() {
      this.result = "ISFP" // debug
    this.storage.get('result')
    .then(result => {
      //this.result = result;
      console.log(result);
      this.handleResult();
    });
  }

}
