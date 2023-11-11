import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Route, Router, Routes } from '@angular/router';
import { DrawerComponent, DrawerMode, DrawerSelectEvent, DrawerItemExpandedFn } from '@progress/kendo-angular-layout';
import { CustomMessagesService } from '../service/custom-messages.service';
import { MessageService } from '@progress/kendo-angular-l10n';
import { SVGIcon, menuIcon } from '@progress/kendo-svg-icons';
import { DrawerItem } from "@progress/kendo-angular-layout";
import {
  bellIcon,
  calendarIcon,
  inboxIcon,
  starOutlineIcon,
  formElementIcon,
  dollarIcon, fileIcon
} from "@progress/kendo-svg-icons";

interface Item { text: string, svgIcon: SVGIcon, path: string, selected?: boolean }


type CustomRoute = Route & {
  text: string;
  svgIcon: SVGIcon;
};


@Component({
  selector: 'app-mainmenuboard',
  templateUrl: './mainmenuboard.component.html',
  styleUrls: ['./mainmenuboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainmenuboardComponent implements OnInit {

  public selected = 'Pay';
  //public items: Array<any> = [];
  //public customMsgService: CustomMessagesService;
  public mode: DrawerMode = 'push';
  public mini = true;

  public expanded = true;
  public items: Array<any> = [];
  // public items: Array<Item> = [];
  public menuSvg: SVGIcon = menuIcon;

  // public items: DrawerItem[] = [
  //   { text: "Inbox", svgIcon: inboxIcon },
  //   { text: "Notifications", svgIcon: bellIcon },
  //   { text: "Favourites", svgIcon: starOutlineIcon },
  //   { text: "Date", svgIcon: calendarIcon },
  // ];

  constructor(private router: Router, public msgService: MessageService) {
    //   this.customMsgService = this.msgService as CustomMessagesService;
    // this.items = this.mapItems(router.config as Item[]);
    // this.items[0].selected = true;

    // const drawerRoutes: Routes = router.config;

    // drawerRoutes.forEach(route => {
    //   this.items.push({
    //     text: (route as CustomRoute).text,
    //     path: route.path ? route.path : '',
    //     svgIcon: (route as CustomRoute).svgIcon
    //   });
    // });

    // this.items[0].selected = true;


  }


  ngOnInit() {
    // Update Drawer selected state when change router path
    this.router.events.subscribe((route: any) => {
      //    if (route instanceof NavigationStart) {
      this.items = this.drawerItems().map((item) => {
        if (item.path && item.path === route.url) {
          item.selected = true;
          return item;
        } else {
          item.selected = false;
          return item;
        }
      });
      //     }
    });

    this.setDrawerConfig();

    // this.customMsgService.localeChange.subscribe(() => {
    //   this.items = this.drawerItems();
    // });

    window.addEventListener('resize', () => {
      this.setDrawerConfig();
    });
  }


  ngOnDestroy() {
    window.removeEventListener('resize', () => { });
  }

  // public mapItems(routes: Item[]): Item[] {
  //   return routes.map(item => {
  //     return {
  //       text: item.text,
  //       svgIcon: item.svgIcon,
  //       path: item.path ? item.path : ''
  //     };
  //   });
  // }


  public drawerItems() {
    return [
      //   { text: "Payable", svgIcon: inboxIcon, path: 'mainmenuboard/products', selected: true },
      { text: "Pay", svgIcon: bellIcon, path: 'mainmenuboard/about', selected: true },
      // { text: this.customMsgService.translate('planning'), icon: 'k-i-calendar', path: '/planning', selected: false },
      // { text: this.customMsgService.translate('profile'), icon: 'k-i-user', path: '/profile', selected: false },
      // { separator: true },
      // { text: this.customMsgService.translate('info'), icon: 'k-i-information', path: '/info', selected: false }

      { separator: true },
      { text: "Payable", svgIcon: dollarIcon, path: 'mainmenuboard/payable', selected: true, id: 4 },
      { text: "Create", svgIcon: fileIcon, path: 'mainmenuboard/payable/create', selected: false, id: 1, parentId: 4 },
      { text: "Edit", svgIcon: fileIcon, path: 'mainmenuboard/payable/update/8', selected: false, id: 3, parentId: 4 },
      { text: "List", svgIcon: dollarIcon, path: 'mainmenuboard/payable/list', selected: false, id: 3, parentId: 4 },
      { text: "sample", svgIcon: dollarIcon, path: 'mainmenuboard/payable/sample', selected: false, id: 3, parentId: 4 },
      { separator: true },
      { text: "issuance", svgIcon: formElementIcon, path: 'mainmenuboard/issuance', selected: false },
    ];
  }

  public toggleDrawer(drawer: DrawerComponent): void {
    drawer.toggle();
  }

  public setDrawerConfig() {
    const pageWidth = window.innerWidth;
    if (pageWidth <= 840) {
      this.mode = 'overlay';
      this.mini = false;
    } else {
      this.mode = 'push';
      this.mini = true;
    }
  }

  public expandedIndices = [2];
  public isItemExpanded: DrawerItemExpandedFn = (item): boolean => {
    return this.expandedIndices.indexOf(item.id) > 0;
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.router.navigate([ev.item.path]);
    this.selected = ev.item.text;
    const current = ev.item.id

    if (this.expandedIndices.indexOf(current) >= 0) {
      this.expandedIndices = this.expandedIndices.filter((id) => id !== current);
    } else {
      this.expandedIndices.push(current);
    }
  }
}


