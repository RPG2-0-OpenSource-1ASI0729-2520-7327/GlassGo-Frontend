/**
 * Resource interface representing geographical coordinates for API data transfer in the Execution bounded context.
 */
export interface CoordinateResource {
  /** Latitude of the coordinate. */
  lat: number;
  /** Longitude of the coordinate. */
  lng: number;
}

/**
 * Resource interface representing a point in the delivery route for API data transfer.
 */
export interface RoutePointResource {
  /** Geographical coordinate of the route point. */
  coordinate: CoordinateResource;
  /** Timestamp when the route point was recorded. */
  timestamp: string;
  /** Optional description of the route point. */
  description?: string;
}

/**
 * Resource interface representing tracking information for API data transfer in the Execution bounded context.
 * Used for communicating tracking data between the infrastructure layer and external APIs.
 */
export interface TrackingResource {
  /** Unique identifier for the tracking record. */
  id: number;
  /** Unique tracking number for the shipment. */
  trackingNumber: string;
  /** Current status of the tracking. */
  status: string;
  /** Destination address of the shipment. */
  destination: string;
  /** Current geographical location of the shipment. */
  currentLocation: CoordinateResource;
  /** Array of route points representing the path taken. */
  route: RoutePointResource[];
  /** Total distance traveled in kilometers. */
  totalDistance: number;
  /** Estimated time of delivery as a string. */
  estimatedDeliveryTime: string;
  /** Actual time of delivery as a string, if delivered. */
  actualDeliveryTime?: string;
  /** Name of the driver assigned to the shipment. */
  driverName?: string;
  /** Identifier of the vehicle used for delivery. */
  vehicleId?: string;
  /** Additional notes or comments about the tracking. */
  notes?: string;
  /** Timestamp when the record was created. */
  createdAt: string;
  /** Timestamp when the record was last updated. */
  updatedAt: string;
}
