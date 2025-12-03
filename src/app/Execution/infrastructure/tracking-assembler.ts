import { Injectable } from '@angular/core';
import { BaseAssembler } from './base-assembler';
import { TrackingInfo, TrackingStatus } from '../domain/model/tracking-info';
import { TrackingResource, RoutePointResource } from './tracking-resource';
import { Coordinate, RoutePoint } from '../domain/model/coordinate';

/**
 * Assembler for converting between TrackingInfo domain entities and TrackingResource API resources in the Execution bounded context.
 * Handles the transformation of tracking data between the domain layer and external APIs.
 */
@Injectable({
  providedIn: 'root'
})
export class TrackingAssembler extends BaseAssembler<TrackingInfo, TrackingResource> {

  /**
   * Converts a TrackingResource to a TrackingInfo domain entity.
   * @param resource The API resource to convert.
   * @returns The corresponding domain entity.
   */
  toEntity(resource: TrackingResource): TrackingInfo {
    const tracking = new TrackingInfo();
    tracking.id = resource.id;
    tracking.trackingNumber = resource.trackingNumber;
    tracking.status = this.mapStringToStatus(resource.status);
    tracking.destination = resource.destination;
    tracking.currentLocation = this.mapCoordinateResourceToEntity(resource.currentLocation);
    tracking.route = this.mapRoutePointsToEntity(resource.route);
    tracking.totalDistance = resource.totalDistance;
    tracking.estimatedDeliveryTime = new Date(resource.estimatedDeliveryTime);
    tracking.actualDeliveryTime = resource.actualDeliveryTime ? new Date(resource.actualDeliveryTime) : undefined;
    tracking.driverName = resource.driverName;
    tracking.vehicleId = resource.vehicleId;
    tracking.notes = resource.notes;
    tracking.createdAt = new Date(resource.createdAt);
    tracking.updatedAt = new Date(resource.updatedAt);

    return tracking;
  }

  /**
   * Converts a TrackingInfo domain entity to a TrackingResource.
   * @param entity The domain entity to convert.
   * @returns The corresponding API resource.
   */
  toResource(entity: TrackingInfo): TrackingResource {
    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber,
      status: entity.status.toString(),
      destination: entity.destination,
      currentLocation: this.mapCoordinateEntityToResource(entity.currentLocation),
      route: this.mapRoutePointsToResource(entity.route),
      totalDistance: entity.totalDistance,
      estimatedDeliveryTime: entity.estimatedDeliveryTime.toISOString(),
      actualDeliveryTime: entity.actualDeliveryTime?.toISOString(),
      driverName: entity.driverName,
      vehicleId: entity.vehicleId,
      notes: entity.notes,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString()
    };
  }

  /**
   * Maps a status string from the resource to the TrackingStatus enum.
   * @param status The status string from the API.
   * @returns The corresponding TrackingStatus enum value.
   */
  private mapStringToStatus(status: string): TrackingStatus {
    return TrackingStatus[status as keyof typeof TrackingStatus] || TrackingStatus.PENDING;
  }

  /**
   * Maps a coordinate resource to a Coordinate domain object.
   * @param resource The coordinate resource from the API.
   * @returns The corresponding Coordinate domain object.
   */
  private mapCoordinateResourceToEntity(resource: { lat: number; lng: number }): Coordinate {
    return {
      lat: resource.lat,
      lng: resource.lng
    };
  }

  /**
   * Maps a Coordinate domain object to a coordinate resource.
   * @param entity The Coordinate domain object.
   * @returns The corresponding coordinate resource for the API.
   */
  private mapCoordinateEntityToResource(entity: Coordinate): { lat: number; lng: number } {
    return {
      lat: entity.lat,
      lng: entity.lng
    };
  }

  /**
   * Maps an array of RoutePointResource to an array of RoutePoint domain objects.
   * @param resources The array of route point resources from the API.
   * @returns The corresponding array of RoutePoint domain objects.
   */
  private mapRoutePointsToEntity(resources: RoutePointResource[]): RoutePoint[] {
    return resources.map(resource => ({
      coordinate: this.mapCoordinateResourceToEntity(resource.coordinate),
      timestamp: new Date(resource.timestamp),
      description: resource.description
    }));
  }

  /**
   * Maps an array of RoutePoint domain objects to an array of RoutePointResource.
   * @param entities The array of RoutePoint domain objects.
   * @returns The corresponding array of RoutePointResource for the API.
   */
  private mapRoutePointsToResource(entities: RoutePoint[]): RoutePointResource[] {
    return entities.map(entity => ({
      coordinate: this.mapCoordinateEntityToResource(entity.coordinate),
      timestamp: entity.timestamp.toISOString(),
      description: entity.description
    }));
  }
}
