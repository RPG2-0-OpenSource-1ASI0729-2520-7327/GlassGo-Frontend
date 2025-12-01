import { BaseAssembler } from './base-assembler';
import { Order, OrderStatus } from '../domain/model/order';
import { OrderItem } from '../domain/model/order-item';
import { DeliveryInformation } from '../domain/model/delivery-information';
import {
  OrderResource,
  OrderItemResource,
  DeliveryInformationResource
} from './order-resource';

export class OrderAssembler extends BaseAssembler<Order, OrderResource> {

  toDomainModel(resource: OrderResource): Order {
    const deliveryInfo = this.deliveryInformationToDomainModel(resource.deliveryInformation);
    const items = resource.items.map(item => this.orderItemToDomainModel(item));

    return new Order(
      resource.id,
      resource.orderNumber,
      resource.status as OrderStatus,
      items,
      deliveryInfo,
      resource.vatRate
    );
  }

  toResource(domainModel: Order): OrderResource {
    return {
      id: domainModel.id,
      orderNumber: domainModel.orderNumber,
      status: domainModel.status,
      items: domainModel.items.map(item => this.orderItemToResource(item)),
      deliveryInformation: this.deliveryInformationToResource(domainModel.deliveryInformation),
      subtotal: domainModel.subtotal,
      vatRate: domainModel.vatRate,
      vatAmount: domainModel.vatAmount,
      total: domainModel.total,
      createdAt: domainModel.createdAt.toISOString(),
      updatedAt: domainModel.updatedAt.toISOString()
    };
  }

  private orderItemToDomainModel(resource: OrderItemResource): OrderItem {
    return new OrderItem(
      resource.id,
      resource.productId,
      resource.productName,
      resource.quantity,
      resource.unitPrice
    );
  }

  private orderItemToResource(domainModel: OrderItem): OrderItemResource {
    return {
      id: domainModel.id,
      productId: domainModel.productId,
      productName: domainModel.productName,
      quantity: domainModel.quantity,
      unitPrice: domainModel.unitPrice,
      totalPrice: domainModel.totalPrice,
      createdAt: domainModel.createdAt.toISOString(),
      updatedAt: domainModel.updatedAt.toISOString()
    };
  }

  private deliveryInformationToDomainModel(resource: DeliveryInformationResource): DeliveryInformation {
    return new DeliveryInformation(
      resource.id,
      resource.deliveryDate,
      resource.deliveryTime,
      resource.deliveryAddress,
      resource.specialInstructions
    );
  }

  private deliveryInformationToResource(domainModel: DeliveryInformation): DeliveryInformationResource {
    return {
      id: domainModel.id,
      deliveryDate: domainModel.deliveryDate,
      deliveryTime: domainModel.deliveryTime,
      deliveryAddress: domainModel.deliveryAddress,
      specialInstructions: domainModel.specialInstructions,
      createdAt: domainModel.createdAt.toISOString(),
      updatedAt: domainModel.updatedAt.toISOString()
    };
  }
}
