import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CreateOrderStore } from '../../../application/create-order.store';
import { DeliveryInformation } from '../../../domain/model/delivery-information';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css'
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private createOrderStore: CreateOrderStore
  ) {
    this.orderForm = this.createOrderForm();
  }

  ngOnInit(): void {
    // Subscribe to order changes to update UI
    this.createOrderStore.currentOrder$.subscribe(order => {
      // Update form if needed or handle order state changes
    });
  }

  private createOrderForm(): FormGroup {
    return this.formBuilder.group({
      deliveryDate: ['', [Validators.required]],
      deliveryTime: ['', [Validators.required]],
      deliveryAddress: ['', [Validators.required]],
      specialInstructions: ['']
    });
  }

  get orderSummary() {
    const currentOrder = this.createOrderStore.currentOrder;
    return {
      subtotal: currentOrder.subtotal,
      vatRate: currentOrder.vatRate,
      vatAmount: currentOrder.vatAmount,
      total: currentOrder.total,
      itemCount: currentOrder.getItemCount()
    };
  }

  onSubmitOrder(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;

      // Update delivery information in the store
      const deliveryInfo = new DeliveryInformation(
        0,
        formData.deliveryDate,
        formData.deliveryTime,
        formData.deliveryAddress,
        formData.specialInstructions
      );

      this.createOrderStore.updateDeliveryInformation(deliveryInfo);

      // Submit the order
      this.createOrderStore.submitOrder().subscribe({
        next: (createdOrder) => {
          console.log('Order created successfully:', createdOrder);
          // Handle success (e.g., show success message, navigate)
        },
        error: (error) => {
          console.error('Error creating order:', error);
          // Handle error (e.g., show error message)
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.orderForm.reset();
    this.createOrderStore.resetOrder();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }


  get isFormValid(): boolean {
    return this.orderForm.valid;
  }
}
