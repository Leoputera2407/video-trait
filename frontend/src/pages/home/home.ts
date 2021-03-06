import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group
} from '@angular/animations';

import { DataProvider } from '../../providers/data/data';

function _window(): any {
  return window;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({
        opacity: 1,
        display: 'block'
      })),
      state('out', style({
        opacity: 0,
        display: 'none'
      })),
      transition('in => out', [
        animate('.5s')
      ]),
      transition('out => in', [
        animate('1s')
      ])
    ]),
      trigger('fadeInLine', [
      state('in', style({
        opacity: 1,
        display: 'block'
      })),
      state('out', style({
        opacity: 0,
        display: 'none'
      })),
      transition('in => out', [
        animate('.5s')
      ]),
      transition('out => in', [
        animate('.5s')
      ])
    ]),
    trigger('slideUp', [
      state('normal', style({
        'transform': 'translateY(0%)'
      })),
      state('up', style({
        'transform': 'translateY(-200px)',
          'font-size': '4em',
          'padding-top': '200px'
      })),
        transition('normal => up', [group([
        animate('1000ms ease-out')
      ])])
    ]),
      trigger('disableBtn', [
          state('enabled', style({
              'opacity': 1,
              'transform': 'translateY(0%)'
          })),
          state('disabled', style({
              'opacity': .4,
              'transform': 'translateY(100%)'
          })),
          transition('enabled => disabled', [group([
              animate('500ms')
          ])]),
          transition('disabled => enabled', [group([
              animate('500ms')
          ])]),
      ]),
  ]})
export class HomePage {
  showMedia: boolean = false;
  fadeInLine: boolean = false;
  loggedIn: boolean = true;
  youtubeLoading: boolean = false;
  youtubeCheck: boolean = false;
  redditLoading: boolean = false;
  redditCheck: boolean = false;
  facebookLoading: boolean = false;
  facebookCheck: boolean = false;

  constructor(public navCtrl: NavController, private dataPvd: DataProvider, private storage: Storage, private _zone: NgZone) {
    console.log(storage);
    storage.set('test', '123');
  }

  start() {
      this.loggedIn = false;
      this.showMedia = true;
      setTimeout(() => this.fadeInLine = true, 500);
      setTimeout(() => document.getElementById("mainBtn").textContent = 'SUBMIT', 1000);
  }

  goTo(pageName: string) {
    this.navCtrl.push(pageName + 'Page');
  }

  loginYoutube() {
    this.youtubeLoading = true;
    this.dataPvd.loginYoutube()
    .subscribe(data => {
      let url: any = data;
      let that = this;
      let selfWindow = _window();

      selfWindow.loginYoutubeCallback = function(code) {
        that.loginYoutubeCallback.call(that, code);
      };

      window.open(url, 'popUp', 'width=500, height=500');
    });
  }

  loginYoutubeCallback(code) {
    this._zone.run(() => {
      this.storage.set('youtubeToken', code);
      this.loggedIn = true;
      this.youtubeLoading = false;
      this.youtubeCheck = true;
    })
  }

  loginReddit() {
    this.redditLoading = true;
    this.dataPvd.loginReddit()
    .subscribe(data => {
      let url: any = data;
      let that = this;
      let selfWindow = _window();

      selfWindow.loginRedditCallback = function(code) {
        that.loginRedditCallback.call(that, code);
      };

      window.open(url, 'redditPopup', 'width=500, height=500');
    });
  }

  loginRedditCallback(code) {
    this._zone.run(() => {
      this.storage.set('redditToken', code);
      this.loggedIn = true;
      this.redditLoading = false;
      this.redditCheck = true;
    });
  }

  loginFacebook() {
    this.facebookLoading = true;
    this.dataPvd.loginFacebook(res => {
      if (res.status === 'connected') {
        this._zone.run(() => {
          this.storage.set('facebookToken', res.authResponse.accessToken);
          this.loggedIn = true;
          this.facebookLoading = false;
          this.facebookCheck = true;
        });
      } else {
        this._zone.run(() => {
          this.facebookLoading = false;
        });
      }
    });
  }

  submit() {
    this.navCtrl.push('LoadingPage');
  }
}
