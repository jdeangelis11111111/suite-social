import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService implements OnInit {
  iconMenu: IMenuItem[];


  x = '0';
  constructor() {
    this.x = localStorage.getItem('userType')
    console.log('Usertype', this.x);
    if (this.x == '1') {
      console.log('Brand', this.x)
      this.iconMenu = [
        /*  {
           type: "separator",
           name: "Brand"
         }, */
        {
          name: "Dashboard",
          type: "link",
          tooltip: "Dashboard",
          icon: "dashboard",
          state: "content/brand/brandDash"
        },
        {
          name: "Search for Influencer",
          type: "link",
          tooltip: "Search for Influencer",
          icon: "search",
          state: "content/brand/searchInf"
        },
        {
          name: "Campaign",
          type: "dropDown",
          tooltip: "Campaign",
          icon: "dashboard",
          // state: "Campaign",
          sub: [
            { name: "Campaign Details", state: "content/brand/reqDet" },
            /* {
              name: "Suggested Influencer", type: "dropDown", icon: "dashboard",
              sub: [{ name: "Price-Value of Influencer", state: "content/brand/priceInf" },]
            },
            { name: "Influencer Approval", state: "content/brand/approval" }, */
          ]
        },

        /*   {
            name: "Contract",
            type: "link",
            tooltip: "Contract",
            icon: "format_list_bulleted",
            state: "content/brand/contactBrand"
          },
          {
            name: "Analytics",
            type: "link",
            tooltip: "Analytics",
            icon: "format_list_bulleted",
            state: "content/brand/brandAnalytics"
          },
          {
            name: "Payment",
            type: "link",
            tooltip: "Payment",
            icon: "format_list_bulleted",
            state: "content/brand/brandPayment"
          }, */
        {
          name: "Review",
          type: "link",
          tooltip: "Review",
          icon: "format_list_bulleted",
          state: "content/brand/reviewBrand"
        },

      ];
    }
    else if (this.x == '2') {
      console.log('influencer', this.x)
      this.iconMenu = [
        /*  {
           type: "separator",
           name: "Influencer"
         }, */
        {
          name: "Dashboard",
          type: "link",
          tooltip: "Dashboard",
          icon: "dashboard",
          state: "content/influencer/InfluencerDash"
        },
        {
          name: "Search for brands",
          type: "link",
          tooltip: "Search for brands",
          icon: "search",
          state: "content/influencer/searchBrand"
        },
        {
          name: "Profile",
          type: "dropDown",
          tooltip: "Profile",
          icon: "dashboard",
          // state: "content/influencer/profile",
          sub: [
            // { name: "Personal Info", state: "content/influencer/personal" },
            /*  { name: "Follower Analytics", state: "content/influencer/analytics" },
             { name: "Past Collabs", state: "content/influencer/pastCol" },
             { name: "Range of pay", state: "content/influencer/range" },
             { name: "Provide Post Link", state: "content/influencer/postLink" }, */
            { name: "Reviews", state: "content/influencer/review" },
            // { name: "Payments", state: "content/influencer/payment" }
          ]
        },
        /*   {
            name: "Schedule -WIP Campaigns",
            type: "dropDown",
            tooltip: "Schedule -WIP Campaigns",
            icon: "dashboard",
            // state: "schedule",
            sub: [
              { name: "Incoming Request", state: "content/influencer/incomReq" },
              { name: "Place outgoing brand request", state: "content/influencer/outReq" },
              {
                name: "Upcoming Campaigns", type: "dropDown", icon: "dashboard",
                sub: [
                  { name: "Brand's request", state: "content/influencer/brandReq" },
                  { name: "Brand's Info", state: "content/influencer/brandInf" },
                  { name: "Do's and Dont's", state: "content/influencer/do" },
                  { name: "Log of actions", state: "content/influencer/logs" },
                ]
              },
              { name: "Contract", state: "content/influencer/contract" },
              { name: "Performance analytics", state: "content/influencer/feedback" },
              { name: "Review", state: "content/influencer/reviews" }
            ]
          }, */


      ];
    }
    else {
      this.constructor();
    }
    this.menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
    // navigation component has subscribed to this Observable
    this.menuItems$ = this.menuItems.asObservable();
  }
  ngOnInit() {

  }

  separatorMenu: IMenuItem[] = [
    {
      type: "separator",
      name: "Custom components"
    },
    {
      name: "DASHBOARD",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard"
    },
    {
      name: "INBOX",
      type: "link",
      tooltip: "Inbox",
      icon: "inbox",
      state: "inbox"
    },
    {
      name: "CHAT",
      type: "link",
      tooltip: "Chat",
      icon: "chat",
      state: "chat"
    },
    {
      name: "CRUD Table",
      type: "link",
      tooltip: "CRUD Table",
      icon: "format_list_bulleted",
      state: "cruds/ngx-table"
    },
    {
      name: "DIALOGS",
      type: "dropDown",
      tooltip: "Dialogs",
      icon: "filter_none",
      state: "dialogs",
      sub: [
        { name: "CONFIRM", state: "confirm" },
        { name: "LOADER", state: "loader" }
      ]
    },
    {
      name: "PROFILE",
      type: "dropDown",
      tooltip: "Profile",
      icon: "person",
      state: "profile",
      sub: [
        { name: "OVERVIEW", state: "overview" },
        { name: "SETTINGS", state: "settings" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "TOUR",
      type: "link",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Integrated components"
    },
    {
      name: "CALENDAR",
      type: "link",
      tooltip: "Calendar",
      icon: "date_range",
      state: "calendar"
    },
    {
      name: "MATERIAL",
      type: "dropDown",
      tooltip: "Material",
      icon: "favorite",
      state: "material",
      sub: [
        { name: "BUTTONS", state: "buttons" },
        { name: "Button Toggle", state: "button-toggle" },
        { name: "Buttons Loading", state: "loading-buttons" },
        { name: "CARDS", state: "cards" },
        { name: "GRIDS", state: "grids" },
        { name: "LISTS", state: "lists" },
        { name: "MENU", state: "menu" },
        { name: "TABS", state: "tabs" },
        { name: "SELECT", state: "select" },
        { name: "RADIO", state: "radio" },
        { name: "AUTOCOMPLETE", state: "autocomplete" },
        { name: "SLIDER", state: "slider" },
        { name: "PROGRESS", state: "progress" },
        { name: "SNACKBAR", state: "snackbar" }
      ]
    },
    {
      name: "FORMS",
      type: "dropDown",
      tooltip: "Forms",
      icon: "description",
      state: "forms",
      sub: [
        { name: "BASIC", state: "basic" },
        { name: "EDITOR", state: "editor" },
        { name: "UPLOAD", state: "upload" },
        { name: "WIZARD", state: "wizard" }
      ]
    },
    {
      name: "TABLES",
      type: "dropDown",
      tooltip: "Tables",
      icon: "format_line_spacing",
      state: "tables",
      sub: [
        { name: "FULLSCREEN", state: "fullscreen" },
        { name: "PAGING", state: "paging" },
        { name: "FILTER", state: "filter" }
      ]
    },
    {
      name: "MAP",
      type: "link",
      tooltip: "Map",
      icon: "add_location",
      state: "map"
    },
    {
      name: "CHARTS",
      type: "link",
      tooltip: "Charts",
      icon: "show_chart",
      state: "charts"
    },
    {
      name: "DND",
      type: "link",
      tooltip: "Drag and Drop",
      icon: "adjust",
      state: "dragndrop"
    },
    {
      type: "separator",
      name: "Other components"
    },
    {
      name: "SESSIONS",
      type: "dropDown",
      tooltip: "Pages",
      icon: "view_carousel",
      state: "sessions",
      sub: [
        { name: "SIGNUP", state: "signup" },
        { name: "SIGNIN", state: "signin" },
        { name: "FORGOT", state: "forgot-password" },
        { name: "LOCKSCREEN", state: "lockscreen" },
        { name: "NOTFOUND", state: "404" },
        { name: "ERROR", state: "error" }
      ]
    },
    {
      name: "OTHERS",
      type: "dropDown",
      tooltip: "Others",
      icon: "blur_on",
      state: "others",
      sub: [
        { name: "GALLERY", state: "gallery" },
        { name: "PRICINGS", state: "pricing" },
        { name: "USERS", state: "users" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "MATICONS",
      type: "link",
      tooltip: "Material Icons",
      icon: "store",
      state: "icons"
    },
    {
      name: "DOC",
      type: "extLink",
      tooltip: "Documentation",
      icon: "library_books",
      state: "http://demos.ui-lib.com/egret-doc/"
    }
  ];

  plainMenu: IMenuItem[] = [
    {
      name: "DASHBOARD",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard"
    },
    {
      name: "INBOX",
      type: "link",
      tooltip: "Inbox",
      icon: "inbox",
      state: "inbox"
    },
    {
      name: "CHAT",
      type: "link",
      tooltip: "Chat",
      icon: "chat",
      state: "chat"
    },
    {
      name: "CRUD Table",
      type: "link",
      tooltip: "CRUD Table",
      icon: "format_list_bulleted",
      state: "cruds/ngx-table"
    },
    {
      name: "CALENDAR",
      type: "link",
      tooltip: "Calendar",
      icon: "date_range",
      state: "calendar"
    },
    {
      name: "DIALOGS",
      type: "dropDown",
      tooltip: "Dialogs",
      icon: "filter_none",
      state: "dialogs",
      sub: [
        { name: "CONFIRM", state: "confirm" },
        { name: "LOADER", state: "loader" }
      ]
    },
    {
      name: "MATERIAL",
      type: "dropDown",
      icon: "favorite",
      state: "component",
      sub: [
        { name: "BUTTONS", state: "buttons" },
        { name: "Button Toggle", state: "button-toggle" },
        { name: "Buttons Loading", state: "loading-buttons" },
        { name: "CARDS", state: "cards" },
        { name: "GRIDS", state: "grids" },
        { name: "LISTS", state: "lists" },
        { name: "MENU", state: "menu" },
        { name: "TABS", state: "tabs" },
        { name: "SELECT", state: "select" },
        { name: "RADIO", state: "radio" },
        { name: "AUTOCOMPLETE", state: "autocomplete" },
        { name: "SLIDER", state: "slider" },
        { name: "PROGRESS", state: "progress" },
        { name: "SNACKBAR", state: "snackbar" }
      ]
    },
    {
      name: "FORMS",
      type: "dropDown",
      tooltip: "Forms",
      icon: "description",
      state: "forms",
      sub: [
        { name: "BASIC", state: "basic" },
        { name: "EDITOR", state: "editor" },
        { name: "UPLOAD", state: "upload" },
        { name: "WIZARD", state: "wizard" }
      ]
    },
    {
      name: "TABLES",
      type: "dropDown",
      tooltip: "Tables",
      icon: "format_line_spacing",
      state: "tables",
      sub: [
        { name: "FULLSCREEN", state: "fullscreen" },
        { name: "PAGING", state: "paging" },
        { name: "FILTER", state: "filter" }
      ]
    },
    {
      name: "PROFILE",
      type: "dropDown",
      tooltip: "Profile",
      icon: "person",
      state: "profile",
      sub: [
        { name: "OVERVIEW", state: "overview" },
        { name: "SETTINGS", state: "settings" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "TOUR",
      type: "link",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      name: "MAP",
      type: "link",
      tooltip: "Map",
      icon: "add_location",
      state: "map"
    },
    {
      name: "CHARTS",
      type: "link",
      tooltip: "Charts",
      icon: "show_chart",
      state: "charts"
    },
    {
      name: "DND",
      type: "link",
      tooltip: "Drag and Drop",
      icon: "adjust",
      state: "dragndrop"
    },
    {
      name: "SESSIONS",
      type: "dropDown",
      tooltip: "Pages",
      icon: "view_carousel",
      state: "sessions",
      sub: [
        { name: "SIGNUP", state: "signup" },
        { name: "SIGNIN", state: "signin" },
        { name: "FORGOT", state: "forgot-password" },
        { name: "LOCKSCREEN", state: "lockscreen" },
        { name: "NOTFOUND", state: "404" },
        { name: "ERROR", state: "error" }
      ]
    },
    {
      name: "OTHERS",
      type: "dropDown",
      tooltip: "Others",
      icon: "blur_on",
      state: "others",
      sub: [
        { name: "GALLERY", state: "gallery" },
        { name: "PRICINGS", state: "pricing" },
        { name: "USERS", state: "users" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "MATICONS",
      type: "link",
      tooltip: "Material Icons",
      icon: "store",
      state: "icons"
    },
    {
      name: "DOC",
      type: "extLink",
      tooltip: "Documentation",
      icon: "library_books",
      state: "http://demos.ui-lib.com/egret-doc/"
    }
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems: any;
  // navigation component has subscribed to this Observable
  menuItems$: any;
  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case "separator-menu":
        this.menuItems.next(this.separatorMenu);
        break;
      case "icon-menu":
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}
