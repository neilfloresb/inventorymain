import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { MessageService } from '@progress/kendo-angular-l10n';
import { locales } from 'src/app/resources/locales';
import { CustomMessagesService } from 'src/app/service/custom-messages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() public toggle = new EventEmitter();
  @Input() public selectedPage?: string;

  public customMsgService: CustomMessagesService;

  public selectedLanguage = { locale: 'English', localeId: 'en-US' };
  public locales = locales;
  public popupSettings = { width: '150' };

  constructor(public messages: MessageService, @Inject(LOCALE_ID) public localeId: string, public intlService: IntlService) {
    this.localeId = this.selectedLanguage.localeId;
    this.setLocale(this.localeId);

    this.customMsgService = this.messages as CustomMessagesService;
    this.customMsgService.language = this.selectedLanguage.localeId;
  }

  public setLocale(locale: any): void {
    (this.intlService as CldrIntlService).localeId = locale;
  }

  public onButtonClick(): void {
    this.toggle.emit();
  }

}
