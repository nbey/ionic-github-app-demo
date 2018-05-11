import { Component } from '@angular/core';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    items = <any>[];

    constructor() {

    }
}
