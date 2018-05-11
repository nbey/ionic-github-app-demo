import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreModule } from '@ngrx/store';;
import { githubUsersReducer, githubUserReducer } from '../githubuser/githubuser.reducer';
import { GithubUserService } from '../githubuser/githubuser.service';
import { EffectsModule } from '@ngrx/effects';
import { GithubUserEffects } from '../githubuser/githubuser.effects';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    TabsPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(<any>{githubUsersState:githubUsersReducer, githubUserState:githubUserReducer}),
    EffectsModule.forRoot([GithubUserEffects])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ListPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GithubUserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
