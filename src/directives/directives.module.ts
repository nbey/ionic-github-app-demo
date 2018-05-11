import { NgModule } from '@angular/core';
import { AccountTypeIconDirective } from './account-type-icon/account-type-icon';
import { InAppBrowserLinkDirective } from './in-app-browser-link/in-app-browser-link';
@NgModule({
	declarations: [AccountTypeIconDirective,
    InAppBrowserLinkDirective],
	imports: [],
	exports: [AccountTypeIconDirective,
    InAppBrowserLinkDirective]
})
export class DirectivesModule {}
