import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {AppUtil} from "../../utilities/app-util";
import {TOKEN_KEY, USER_KEY, WORD_INITIAL_KEY} from "../../utilities/contants";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormFieldErrorsPipe} from "../../pipes/form-field-errors.pipe";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    FormFieldErrorsPipe,
    MatTooltip
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'nav-bar-component'}
})
export class NavBarComponent implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  displayName: string | null = '';

  search = new FormControl('');

  ngOnInit() {
    this.displayName = AppUtil.getStorageValue(USER_KEY);

    this.route.queryParams.subscribe(params => {
      this.search.setValue(params?.['search'] ?? '');

      const mediaQuery = window.matchMedia('(max-width: 430px)');

      mediaQuery.addEventListener('change', (event) => {
        this.displayName = AppUtil.getStorageValue(USER_KEY);

        if (event.matches) {
          this.displayName = AppUtil.getStorageValue(WORD_INITIAL_KEY);
        }
      });
    })
  }

  logout() {
    AppUtil.setStorageValue(TOKEN_KEY, '');
    this.router.navigate(['/login']).then();
  }

  onSubmit(isClear = false) {
    const inputValue = this.search.value;
    this.router.navigate(['/tasks'], {
      queryParams: {
        search: isClear ? '' : inputValue
      }
    }).then();
  }
}
