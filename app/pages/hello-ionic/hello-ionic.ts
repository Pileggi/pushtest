import {Component} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  public deviceToken: any = '';
  constructor() {
    let local = new Storage(LocalStorage);
    local.get('deviceToken').then((value) => {
      this.deviceToken = value;
    });
  }
}
