import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProcurementOrder } from '../../models/procurement-order.model';
import { ProcurementService } from '../../services/procurement.service';

@Component({
  selector: 'app-procurement-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './procurement-list.component.html',
})
export class ProcurementListComponent implements OnInit {
  orders: ProcurementOrder[] = [];
  loading = false;

  constructor(private procurementService: ProcurementService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders() {
    this.loading = true;

    try {
      this.orders = await this.procurementService.findAll();
      console.log('Orders loaded:', this.orders);
    } catch (error) {
      console.error('Error loading orders', error);
    } finally {
      this.loading = false;
    }
  }

  async deleteOrder(id: number) {
    try {
      await this.procurementService.delete(id);
      this.orders = this.orders.filter((order) => order.id !== id);
      console.log('Order deleted:', id);
    } catch (error) {
      console.error('Error deleting order', error);
    }
  }
}
