import { Component, OnInit, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CreateOrderStore } from '../../../application/create-order.store';
import { DeliveryInformation } from '../../../domain/model/delivery-information';
import { Product } from '../../../domain/model/product';
import { OrderItem } from '../../../domain/model/order-item';

/**
 * Component for creating orders in the service planning bounded context.
 * Provides a form for entering delivery information and submitting orders.
 * @example
 * ```typescript
 * // In template: <app-create-order></app-create-order>
 * // Component handles form submission and order creation
 * ```
 */
@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css'
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;

  // Product management state
  searchTerm = signal('');
  showProductSelector = signal(false);

  // Store-dependent computed properties (will be initialized in constructor)
  currentOrder!: any;
  currentOrderItems!: any;
  filteredAvailableProducts!: any;

  // Constructor must be called first to initialize dependencies
  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private createOrderStore: CreateOrderStore
  ) {
    this.orderForm = this.createOrderForm();

    // Initialize computed properties after store is available
    this.currentOrder = computed(() => this.createOrderStore.currentOrder);
    this.currentOrderItems = computed(() => this.currentOrder().items);

    // For availableProducts, we'll use a getter method instead
    this.filteredAvailableProducts = computed(() => {
      const products = this.getAvailableProducts();
      const search = this.searchTerm().toLowerCase();

      if (!search) return products;

      return products.filter((product: Product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      );
    });
  }

  // Getter method to access available products from store
  getAvailableProducts(): Product[] {
    return this.createOrderStore.products().filter((product: Product) =>
      product.isAvailable && product.stockQuantity > 0
    );
  }


  /**
   * Initializes the component and subscribes to order changes.
   */
  ngOnInit(): void {
    // Load available products
    this.createOrderStore.loadProducts();

    // Subscribe to order changes to update UI
    this.createOrderStore.currentOrder$.subscribe(order => {
      // Update form if needed or handle order state changes
      console.log('Order updated:', order);
    });
  }

  /**
   * Creates the order form with validation.
   * @returns The FormGroup for the order form.
   * @private
   */
  private createOrderForm(): FormGroup {
    return this.formBuilder.group({
      deliveryDate: ['', [Validators.required]],
      deliveryTime: ['', [Validators.required]],
      deliveryAddress: ['', [Validators.required]],
      specialInstructions: ['']
    });
  }

  /**
   * Gets the order summary for display.
   */
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

  /**
   * Handles the submission of the order form.
   */
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

  /**
   * Cancels the order creation and resets the form and store.
   */
  onCancel(): void {
    this.orderForm.reset();
    this.createOrderStore.resetOrder();
  }

  /**
   * Marks all form controls as touched to show validation errors.
   * @private
   */
  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Checks if the form is valid.
   */
  get isFormValid(): boolean {
    return this.orderForm.valid;
  }

  // Product management methods

  /**
   * Handles product search input changes.
   * @param event - The input event.
   */
  onSearchProducts(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.createOrderStore.setSearchTerm(target.value);
  }

  /**
   * Toggles the product selector visibility.
   */
  onAddNewProduct(): void {
    this.showProductSelector.update(current => !current);
  }

  /**
   * Adds a product to the current order.
   * @param product - The product to add.
   * @param quantity - The quantity to add.
   */
  onAddProductToOrder(product: Product, quantity: string | number): void {
    const qty = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
    if (qty > 0) {
      this.createOrderStore.addProductToOrder(product, qty);
    }
  }

  /**
   * Updates the quantity of an order item.
   * @param productId - The product ID.
   * @param event - The change event.
   */
  onUpdateQuantity(productId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const quantity = parseInt(target.value, 10);
    if (quantity > 0) {
      this.createOrderStore.updateOrderItemQuantity(productId, quantity);
    }
  }

  /**
   * Removes an item from the current order.
   * @param productId - The product ID to remove.
   */
  onRemoveItem(productId: number): void {
    this.createOrderStore.removeOrderItem(productId);
  }

  /**
   * TrackBy function for order items.
   * @param index - The index.
   * @param item - The order item.
   * @returns The tracking identifier.
   */
  trackByOrderItem(index: number, item: OrderItem): number {
    return item.productId;
  }

  /**
   * TrackBy function for products.
   * @param index - The index.
   * @param product - The product.
   * @returns The tracking identifier.
   */
  trackByProduct(index: number, product: Product): number {
    return product.id;
  }
}
