import { BaseEntity } from './base-entity';
import { Coordinate, RoutePoint } from './coordinate';

/**
 * Enumeration of possible tracking statuses in the Execution bounded context.
 * Represents the lifecycle states of a shipment tracking.
 */
export enum TrackingStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED'
}

/**
 * Domain entity representing tracking information for a shipment in the Execution bounded context.
 * Encapsulates the state and behavior of tracking a delivery, including location updates and status changes.
 * Ensures domain invariants such as valid status transitions and route consistency.
 */
export class TrackingInfo extends BaseEntity {
  /** Unique tracking number for the shipment. */
  trackingNumber: string;
  /** Current status of the tracking. */
  status: TrackingStatus;
  /** Destination address of the shipment. */
  destination: string;
  /** Current geographical location of the shipment. */
  currentLocation: Coordinate;
  /** Array of route points representing the path taken. */
  route: RoutePoint[];
  /** Total distance traveled in kilometers. */
  totalDistance: number;
  /** Estimated time of delivery. */
  estimatedDeliveryTime: Date;
  /** Actual time of delivery, if delivered. */
  actualDeliveryTime?: Date;
  /** Name of the driver assigned to the shipment. */
  driverName?: string;
  /** Identifier of the vehicle used for delivery. */
  vehicleId?: string;
  /** Additional notes or comments about the tracking. */
  notes?: string;

  /**
   * Constructs a new TrackingInfo instance with default values.
   */
  constructor() {
    super();
    this.trackingNumber = '';
    this.status = TrackingStatus.PENDING;
    this.destination = '';
    this.currentLocation = { lat: 0, lng: 0 };
    this.route = [];
    this.totalDistance = 0;
    this.estimatedDeliveryTime = new Date();
  }

  /**
   * Updates the current location of the shipment and adds a new route point.
   * @param coordinate The new coordinate for the location update.
   * @param description Optional description for the route point.
   */
  updateLocation(coordinate: Coordinate, description?: string): void {
    this.currentLocation = coordinate;
    this.route.push({
      coordinate,
      timestamp: new Date(),
      description
    });
    this.updatedAt = new Date();
  }

  /**
   * Updates the status of the tracking.
   * @param status The new tracking status.
   */
  updateStatus(status: TrackingStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  /**
   * Marks the shipment as delivered, setting the actual delivery time.
   */
  markAsDelivered(): void {
    this.status = TrackingStatus.DELIVERED;
    this.actualDeliveryTime = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Checks if the shipment is currently in transit.
   * @returns True if the status is IN_TRANSIT, false otherwise.
   */
  isInTransit(): boolean {
    return this.status === TrackingStatus.IN_TRANSIT;
  }

  /**
   * Checks if the shipment has been delivered.
   * @returns True if the status is DELIVERED, false otherwise.
   */
  isDelivered(): boolean {
    return this.status === TrackingStatus.DELIVERED;
  }
}
