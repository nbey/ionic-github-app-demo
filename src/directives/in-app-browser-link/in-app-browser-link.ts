import { Directive, ElementRef, HostListener } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the InAppBrowserLinkDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[in-app-browser-link]' // Attribute selector
})
export class InAppBrowserLinkDirective {
  @HostListener('click') onLinkClick(evt) {
      if (evt && evt.preventDefault) {
          evt.preventDefault();
          this.iab.create(evt.target.href, '_self', {location: 'no'});
      }
  }
  constructor(private iab:InAppBrowser) {
  }

}
