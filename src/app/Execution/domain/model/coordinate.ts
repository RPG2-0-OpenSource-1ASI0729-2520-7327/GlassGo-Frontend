/**
 * Domain interface representing geographical coordinates in the Execution bounded context.
 * Used to define locations for tracking and routing purposes.
 */
export interface Coordinate {
  /** Latitude coordinate in decimal degrees. */
  lat: number;
  /** Longitude coordinate in decimal degrees. */
  lng: number;
}

/**
 * Domain interface representing a point in the delivery route.
 * Captures location, time, and optional description for route tracking.
 */
export interface RoutePoint {
  /** Geographical coordinate of the route point. */
  coordinate: Coordinate;
  /** Timestamp when the route point was recorded. */
  timestamp: Date;
  /** Optional description or note about the route point. */
  description?: string;
}
