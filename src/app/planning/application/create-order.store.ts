import { Injectable, inject, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, of } from 'rxjs';
import { Order } from '../domain/model/order';
import { OrderItem } from '../domain/model/order-item';
import { DeliveryInformation } from '../domain/model/delivery-information';
import { Product } from '../domain/model/product';
import { BaseApi } from '../infrastructure/base-api';
import { ProductApi } from '../infrastructure/product-api';
import { HttpClient } from '@angular/common/http';

/**
 * Application service store for managing order creation and product operations in the planning bounded context.
 * Handles order state, product management, loading states, and error management using reactive patterns.
 * Acts as a facade for domain operations and infrastructure interactions.
 */
@Injectable({
  providedIn: 'root'
})
export class CreateOrderStore {
  private http = inject(HttpClient);
  private productApi: ProductApi;

  // Order-related state using BehaviorSubject
  private currentOrderSubject = new BehaviorSubject<Order>(new Order());
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public readonly currentOrder$ = this.currentOrderSubject.asObservable();
  public readonly isLoading$ = this.isLoadingSubject.asObservable();
  public readonly error$ = this.errorSubject.asObservable();

  // Product-related signals
  private readonly _products = signal<Product[]>([]);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _isProductsLoading = signal<boolean>(false);
  private readonly _productsError = signal<string | null>(null);
  private readonly _searchTerm = signal<string>('');

  // Public readonly computed values for products
  public readonly products = this._products.asReadonly();
  public readonly selectedProduct = this._selectedProduct.asReadonly();
  public readonly isProductsLoading = this._isProductsLoading.asReadonly();
  public readonly productsError = this._productsError.asReadonly();
  public readonly searchTerm = this._searchTerm.asReadonly();

  // Filtered products based on search term
  public readonly filteredProducts = computed(() => {
    const search = this._searchTerm().toLowerCase();
    const allProducts = this._products();

    if (!search) {
      return allProducts;
    }

    return allProducts.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  // Available products (in stock and available)
  public readonly availableProducts = computed(() =>
    this._products().filter(product => product.isAvailable && product.stockQuantity > 0)
  );

  constructor(private baseApi: BaseApi) {
    this.productApi = new ProductApi(this.http);
  }

  /**
   * Gets the current order snapshot.
   */
  get currentOrder(): Order {
    return this.currentOrderSubject.value;
  }

  // PRODUCT MANAGEMENT METHODS

  /**
   * Loads all products from the API.
   */
  loadProducts(): void {
    this._isProductsLoading.set(true);
    this._productsError.set(null);

    this.productApi.getAll().pipe(
      tap((products: Product[]) => {
        this._products.set(products);
        this._isProductsLoading.set(false);
      }),
      catchError((error: any) => {
        this._productsError.set('Error loading products: ' + error.message);
        this._isProductsLoading.set(false);
        return of([]);
      })
    ).subscribe();
  }

  /**
   * Loads a product by ID.
   * @param id The unique identifier of the product to load.
   */
  loadProductById(id: number): void {
    this._isProductsLoading.set(true);
    this._productsError.set(null);

    this.productApi.getById(id).pipe(
      tap((product: Product | null) => {
        if (product) {
          this._selectedProduct.set(product);
        }
        this._isProductsLoading.set(false);
      }),
      catchError((error: any) => {
        this._productsError.set('Error loading product: ' + error.message);
        this._isProductsLoading.set(false);
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Sets the search term for filtering products.
   */
  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  /**
   * Selects a product.
   */
  selectProduct(product: Product): void {
    this._selectedProduct.set(product);
  }

  /**
   * Clears the current product selection.
   */
  clearProductSelection(): void {
    this._selectedProduct.set(null);
  }

  /**
   * Clears products error state.
   */
  clearProductsError(): void {
    this._productsError.set(null);
  }

  // ORDER MANAGEMENT METHODS

  /**
   * Updates the delivery information of the current order.
   */
  updateDeliveryInformation(deliveryInfo: DeliveryInformation): void {
    const order = this.currentOrder;
    order.deliveryInformation = deliveryInfo;
    this.currentOrderSubject.next(order);
  }

  /**
   * Adds an order item to the current order.
   */
  addOrderItem(item: OrderItem): void {
    const order = this.currentOrder;
    order.addItem(item);
    this.currentOrderSubject.next(order);
  }

  /**
   * Adds a product to the current order with specified quantity.
   */
  addProductToOrder(product: Product, quantity: number = 1): void {
    if (!product.isAvailable) {
      this.errorSubject.next('Product is not available');
      return;
    }

    if (!product.hasEnoughStock(quantity)) {
      this.errorSubject.next(`Insufficient stock. Available: ${product.stockQuantity}`);
      return;
    }

    const existingItem = this.currentOrder.items.find(item => item.productId === product.id);

    if (existingItem) {
      // Update quantity if item already exists
      const newQuantity = existingItem.quantity + quantity;
      if (product.hasEnoughStock(newQuantity)) {
        this.updateOrderItemQuantity(product.id, newQuantity);
      } else {
        this.errorSubject.next(`Insufficient stock for total quantity: ${newQuantity}`);
      }
    } else {
      // Add new item
      const orderItem = new OrderItem(0, product, quantity);
      this.addOrderItem(orderItem);
    }
  }

  /**
   * Removes an order item from the current order by product ID.
   */
  removeOrderItem(productId: number): void {
    const order = this.currentOrder;
    order.removeItem(productId);
    this.currentOrderSubject.next(order);
  }

  /**
   * Updates the quantity of a specific order item.
   */
  updateOrderItemQuantity(productId: number, quantity: number): void {
    const order = this.currentOrder;
    order.updateItemQuantity(productId, quantity);
    this.currentOrderSubject.next(order);
  }

  /**
   * Submits the current order for creation.
   */
  submitOrder(): Observable<Order> {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    return new Observable(observer => {
      this.baseApi.create(this.currentOrder).subscribe({
        next: (createdOrder) => {
          this.isLoadingSubject.next(false);
          this.resetOrder();
          observer.next(createdOrder);
          observer.complete();
        },
        error: (error) => {
          this.isLoadingSubject.next(false);
          this.errorSubject.next(error.message || 'Error creating order');
          observer.error(error);
        }
      });
    });
  }

  /**
   * Retrieves all orders.
   */
  getAllOrders(): Observable<Order[]> {
    return this.baseApi.getAll();
  }

  /**
   * Retrieves an order by its ID.
   */
  getOrderById(id: number): Observable<Order> {
    return this.baseApi.getById(id);
  }

  /**
   * Updates an existing order.
   */
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.baseApi.update(id, order);
  }

  /**
   * Deletes an order by its ID.
   */
  deleteOrder(id: number): Observable<void> {
    return this.baseApi.delete(id);
  }

  /**
   * Resets the current order to a new empty order.
   */
  resetOrder(): void {
    this.currentOrderSubject.next(new Order());
    this.errorSubject.next(null);
  }

  /**
   * Clears any current error state.
   */
  clearError(): void {
    this.errorSubject.next(null);
  }
}
