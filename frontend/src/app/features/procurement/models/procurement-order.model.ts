export interface ProcurementItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface ProcurementOrder {
  id: number;
  requestNumber: string;
  supplierName: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  items: ProcurementItem[];
}

export interface ProcurementOrderCreate {
  requestNumber: string;
  supplierName: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  items: ProcurementItem[];
}

export interface ProcurementOrderUpdate extends ProcurementOrderCreate {
  id: number;
}
