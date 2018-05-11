import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { SearchPage } from '../search/search';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = ListPage;
    tab2Root = SearchPage;

  constructor() {

  }
}
