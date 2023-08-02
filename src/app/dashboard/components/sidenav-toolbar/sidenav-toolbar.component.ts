import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../../../services/auth.service";
import {sideNav, UserRole} from "../../../model/interfaces";
import {NAV_ITEMS} from "../../../model/constants";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-sidenav-toolbar',
  templateUrl: './sidenav-toolbar.component.html',
  styleUrls: ['./sidenav-toolbar.component.scss']
})
export class SidenavToolbarComponent {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  navItems: sideNav[] = NAV_ITEMS;
  filteredNav: sideNav[] = [];
  userName: string | null = sessionStorage?.getItem('username');

  constructor(private apiService: ApiService, private authService: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  async ngOnInit() {
    this.apiService.checkRoles(this.userName).subscribe((role: UserRole) => {
      this.filteredNav = this.navItems.filter(item => {
        return role[item.permission] == 1;
      });
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
