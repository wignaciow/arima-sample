import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Company, UserContextResponse } from '../models/context.model';
import { CoreApi } from '../../api';

@Injectable({ providedIn: 'root' })
export class ContextService {
  private readonly http = inject(HttpClient);

  private readonly _companies = signal<Company[]>([]);
  private readonly _selectedCompanyId = signal<string | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly companies = computed(() => this._companies());
  readonly selectedCompanyId = computed(() => this._selectedCompanyId());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  readonly selectedCompany = computed<Company | null>(() => {
    const selectedId = this._selectedCompanyId();
    if (!selectedId) return null;
    return this._companies().find(company => company.id === selectedId) ?? null;
  });

  //A futuro para filtrar las companias de el usuario particular/activas
  readonly activeCompanies = computed(() => this._companies());

  async loadUserContext(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const resp = await firstValueFrom(
        this.http.get<UserContextResponse>(CoreApi.CONTEXT_COMPANIES)
      );

      const companies = resp.companies ?? [];
      const requestedSelectedId = resp.selectedCompanyId ?? null;

      const selectedExists = companies.some(
        company => company.id === requestedSelectedId
      );

      this._companies.set(companies);
      this._selectedCompanyId.set(
        selectedExists ? requestedSelectedId : (companies[0]?.id ?? null)
      );
    } catch (error) {
      console.error('Error loading user context', error);
      this._error.set('No se pudo cargar el contexto de empresa');
      this._companies.set([]);
      this._selectedCompanyId.set(null);
    } finally {
      this._loading.set(false);
    }
  }

  activateCompany(company: Company): void {
    const exists = this._companies().some(item => item.id === company.id);
    if (!exists) return;

    this._selectedCompanyId.set(company.id);
  }

  selectCompany(companyId: string): void {
    const exists = this._companies().some(company => company.id === companyId);
    if (!exists) return;

    this._selectedCompanyId.set(companyId);
  }

  clearContext(): void {
    this._companies.set([]);
    this._selectedCompanyId.set(null);
    this._loading.set(false);
    this._error.set(null);
  }
}