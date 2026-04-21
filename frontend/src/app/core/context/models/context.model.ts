export interface UserContextResponse {
  companies: { id: string; label: string }[];
  selectedCompanyId?: string;
}

export interface Company {
  id: string;
  label: string;
}