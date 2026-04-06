import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProcurementService } from '../../services/procurement.service';
import {
  ProcurementItem,
  ProcurementOrder,
  ProcurementOrderCreate,
  ProcurementOrderUpdate,
} from '../../models/procurement-order.model';

@Component({
  selector: 'app-procurement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './procurement-form.component.html',
})
export class ProcurementFormComponent implements OnInit {
  form!: FormGroup;
  orderId?: number;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private procurementService: ProcurementService,
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.orderId = Number(idParam);
      this.load(this.orderId);
    }

    this.form.get('items')?.valueChanges.subscribe(() => {
      this.recalculateTotal();
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      requestNumber: ['', [Validators.required, Validators.maxLength(20)]],
      supplierName: ['', [Validators.required, Validators.maxLength(150)]],
      orderDate: ['', Validators.required],
      status: ['PENDING', Validators.required],
      totalAmount: [{ value: 0, disabled: true }],
      items: this.fb.array([]),
    });
  }

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  private createItemForm(item?: ProcurementItem): FormGroup {
    return this.fb.group({
      id: [item?.id ?? null],
      productName: [item?.productName ?? '', [Validators.required, Validators.maxLength(150)]],
      quantity: [item?.quantity ?? 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item?.unitPrice ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  private buildCreatePayload(): ProcurementOrderCreate {
    const rawValue = this.form.getRawValue();

    return {
      requestNumber: rawValue.requestNumber,
      supplierName: rawValue.supplierName,
      orderDate: rawValue.orderDate,
      status: rawValue.status,
      totalAmount: rawValue.totalAmount,
      items: rawValue.items.map((item: ProcurementItem) => ({
        id: item.id ?? undefined,
        productName: item.productName,
        quantity: Number(item.quantity) || 0,
        unitPrice: Number(item.unitPrice) || 0,
      })),
    };
  }

  private buildUpdatePayload(): ProcurementOrderUpdate {
    return {
      id: this.orderId as number,
      ...this.buildCreatePayload(),
    };
  }

  async load(id: number): Promise<void> {
    this.loading = true;

    try {
      const order: ProcurementOrder = await this.procurementService.findById(id);

      this.form.patchValue({
        requestNumber: order.requestNumber,
        supplierName: order.supplierName,
        orderDate: order.orderDate,
        status: order.status,
      });

      this.items.clear();
      (order.items ?? []).forEach((item) => {
        this.items.push(this.createItemForm(item));
      });

      this.recalculateTotal();
    } catch (error) {
      console.error('Error loading order', error);
    } finally {
      this.loading = false;
    }
  }

  addItem(): void {
    this.items.push(this.createItemForm());
    this.recalculateTotal();
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.recalculateTotal();
  }

  recalculateTotal(): void {
    const total = this.items.controls.reduce((sum: number, control: FormGroup) => {
      const quantity = Number(control.get('quantity')?.value) || 0;
      const unitPrice = Number(control.get('unitPrice')?.value) || 0;
      return sum + quantity * unitPrice;
    }, 0);

    this.form.get('totalAmount')?.setValue(total, { emitEvent: false });
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    try {
      this.recalculateTotal();

      const result =
        this.orderId !== undefined
          ? await this.procurementService.update(this.orderId, this.buildUpdatePayload())
          : await this.procurementService.create(this.buildCreatePayload());

      console.log('Order saved:', result);
      this.router.navigate(['/procurement']);
    } catch (error) {
      console.error('Error saving order', error);
    } finally {
      this.saving = false;
    }
  }
}
