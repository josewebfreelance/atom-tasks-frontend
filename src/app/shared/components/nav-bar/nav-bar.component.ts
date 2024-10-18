import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {AppUtil} from "../../utilities/app-util";
import {TOKEN_KEY, USER_KEY} from "../../utilities/contants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
    imports: [
        MatIcon,
        MatTooltip
    ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  readonly router = inject(Router);
  displayName: string | null = '';

  ngOnInit() {
    this.displayName = AppUtil.getStorageValue(USER_KEY);
  }

  logout() {
    AppUtil.setStorageValue(TOKEN_KEY, '');
    this.router.navigate(['/login']).then();
  }

}
