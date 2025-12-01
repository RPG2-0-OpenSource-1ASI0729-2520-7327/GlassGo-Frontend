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

export interface DeliveryInformationResource {
  id: number;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

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
