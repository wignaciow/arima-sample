import { Component, computed, HostListener, inject, input, output, signal, ViewChild } from '@angular/core';
import { ContextService } from '../../../core/context/services/context.service';
import { Company } from '../../../core/context/models/context.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-context-selector',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    SearchBoxComponent
  ],
  templateUrl: './app-context-selector.component.html',
})
export class AppContextSelectorComponent {
  readonly context = inject(ContextService);

  disabled = input(false);
  disableRipple = input(false);

  companyChange = output<Company>();

  @ViewChild("companyBtnRef", { read: MatMenuTrigger })
  protected companyBtn?: MatMenuTrigger;

  protected companySearch = signal('');
  protected companySearchCtrl = new FormControl('', { nonNullable: true });

  readonly currentCompany = this.context.selectedCompany;
  protected currentCompanyLabel = computed(
    () => this.currentCompany()?.label ?? ''
  );

  protected visibleCompanies = computed(() => {
    const search = this.companySearch().trim().toLowerCase();
    const companies = this.context.activeCompanies();
  
    if (!search) return companies;
  
    return companies.filter(company =>
      company.label.toLowerCase().includes(search)
    );
  });

  @HostListener('click')
  protected hostClick(): void {
    this.companyBtn?.openMenu();
  }

  protected activateCompany(value: Company): void {
    this.context.activateCompany(value);
    this.companyChange.emit(value);
    this.companySearch.set('');
    this.companySearchCtrl.setValue('', { emitEvent: false });
  }

  protected onSearchChange(value: string): void {
    this.companySearch.set(value);
  }
}


