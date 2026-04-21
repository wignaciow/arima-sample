import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  templateUrl: './search-box.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class SearchBoxComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  showSearchIcon = input<boolean, BooleanInput>(false, {
    transform: coerceBooleanProperty,
  });

  searchLabel = input<string>('generic.text.search');

  searchCtrl = input<FormControl<string>>(
    new FormControl<string>('', { nonNullable: true })
  );

  searchChange = output<string>();

  ngOnInit(): void {
    this.monitorSearchCtx();
  }

  private monitorSearchCtx(): void {
    this.searchCtrl()
      .valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => this.searchChange.emit(value));
  }
}