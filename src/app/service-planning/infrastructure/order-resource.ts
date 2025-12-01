/**
 * Resource structure for OrderItem data transfer between API and application.
 */
export interface OrderItemResource {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Resource structure for DeliveryInformation data transfer between API and application.
 */
export interface DeliveryInformationResource {
  id: number;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Resource structure for Order data transfer between API and application.
 */
export interface OrderResource {
  id: number;
  orderNumber: string;
  status: string;
  items: OrderItemResource[];
  deliveryInformation: DeliveryInformationResource;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
