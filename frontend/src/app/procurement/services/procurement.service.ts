import { Injectable } from '@angular/core';
import {
  ProcurementOrder,
  ProcurementOrderCreate,
  ProcurementOrderUpdate,
} from '../models/procurement-order.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementService {
  private readonly baseUrl = '/api/procurement-orders';

  async findAll(): Promise<ProcurementOrder[]> {
    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error('Error fetching orders');
    }

    return response.json();
  }

  async findById(id: number): Promise<ProcurementOrder> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error('Error fetching orders');
    }

    return response.json();
  }

  async create(order: ProcurementOrderCreate): Promise<ProcurementOrder> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Error fetching orders');
    }

    return response.json();
  }

  async update(id: number, order: ProcurementOrderUpdate): Promise<ProcurementOrder> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Error fetching orders');
    }

    return response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
  }
}
