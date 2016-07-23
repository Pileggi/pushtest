import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {Push} from 'ionic-native';
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let local = new Storage(LocalStorage);
      let push = Push.init({
       android: {
           senderID: "651298752808"
       },
       ios: {
           alert: "true",
           badge: true,
           sound: 'false'
       }
      });
      push.on('registration', function(data) {
        local.set('deviceToken', data.registrationId);
      	console.log('Device Token:', data.registrationId);
      });
      push.on('error', function(e) {
        console.log('Push Register Error', e.message);
      });
      push.on('notification', (data) => {
          console.log('Message:', data);
      });
      Push.hasPermission().then((data) => {
        console.log('isEnabled', data);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
