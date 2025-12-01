import { BaseAssembler } from './base-assembler';
import { Order, OrderStatus } from '../domain/model/order';
import { OrderItem } from '../domain/model/order-item';
import { DeliveryInformation } from '../domain/model/delivery-information';
import {
  OrderResource,
  OrderItemResource,
  DeliveryInformationResource
} from './order-resource';

/**
 * Assembler for converting between Order domain entities and Order resources.
 * Handles the transformation of orders, order items, and delivery information.
 * @example
 * ```typescript
 * const assembler = new OrderAssembler();
 * const orderResource: OrderResource = { id: 1, orderNumber: 'ORD-001', ... };
 * const order = assembler.toDomainModel(orderResource);
 * const resource = assembler.toResource(order);
 * ```
 */
export class OrderAssembler extends BaseAssembler<Order, OrderResource> {

  /**
   * Converts an Order resource to an Order domain entity.
   * @param resource - The Order resource from the API.
   * @returns The corresponding Order domain entity.
   */
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

  /**
   * Converts an Order domain entity to an Order resource.
   * @param domainModel - The Order domain entity.
   * @returns The corresponding Order resource for API communication.
   */
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

  /**
   * Converts an OrderItem resource to an OrderItem domain entity.
   * @param resource - The OrderItem resource.
   * @returns The OrderItem domain entity.
   * @private
   */
  private orderItemToDomainModel(resource: OrderItemResource): OrderItem {
    return new OrderItem(
      resource.id,
      resource.productId,
      resource.productName,
      resource.quantity,
      resource.unitPrice
    );
  }

  /**
   * Converts an OrderItem domain entity to an OrderItem resource.
   * @param domainModel - The OrderItem domain entity.
   * @returns The OrderItem resource.
   * @private
   */
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

  /**
   * Converts a DeliveryInformation resource to a DeliveryInformation domain entity.
   * @param resource - The DeliveryInformation resource.
   * @returns The DeliveryInformation domain entity.
   * @private
   */
  private deliveryInformationToDomainModel(resource: DeliveryInformationResource): DeliveryInformation {
    return new DeliveryInformation(
      resource.id,
      resource.deliveryDate,
      resource.deliveryTime,
      resource.deliveryAddress,
      resource.specialInstructions
    );
  }

  /**
   * Converts a DeliveryInformation domain entity to a DeliveryInformation resource.
   * @param domainModel - The DeliveryInformation domain entity.
   * @returns The DeliveryInformation resource.
   * @private
   */
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
