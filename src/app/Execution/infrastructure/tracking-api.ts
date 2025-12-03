import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base-api';
import { TrackingApiEndpoint } from './tracking-api-endpoint';
import { TrackingResource } from './tracking-resource';
import { TrackingInfo } from '../domain/model/tracking-info';
import { TrackingAssembler } from './tracking-assembler';

/**
 * Infrastructure service for handling tracking-related API operations in the Execution bounded context.
 * Provides methods to retrieve and search tracking information from external APIs.
 */
@Injectable({
  providedIn: 'root'
})
export class TrackingApi extends BaseApi {

  constructor(
    http: HttpClient,
    private trackingAssembler: TrackingAssembler
  ) {
    super(http);
  }

  /**
   * Retrieves tracking information by tracking number.
   * @param trackingNumber The unique tracking number to search for.
   * @returns An observable of the tracking info entity or null if not found.
   */
  getTrackingByNumber(trackingNumber: string): Observable<TrackingInfo | null> {
    const url = `${TrackingApiEndpoint.BASE_URL}${TrackingApiEndpoint.TRACKING_BY_NUMBER(trackingNumber)}`;

    return this.http.get<TrackingResource>(url, this.getHttpOptions()).pipe(
      map(resource => this.trackingAssembler.toEntity(resource)),
      catchError(error => {
        console.error('Error fetching tracking info:', error);
        return of(null);
      })
    );
  }

  /**
   * Retrieves all tracking records.
   * @returns An observable of an array of tracking info entities.
   */
  getAllTrackings(): Observable<TrackingInfo[]> {
    const url = `${TrackingApiEndpoint.BASE_URL}${TrackingApiEndpoint.TRACKING}`;

    return this.http.get<TrackingResource[]>(url, this.getHttpOptions()).pipe(
      map(resources => this.trackingAssembler.toEntityList(resources)),
      catchError(error => {
        console.error('Error fetching all trackings:', error);
        return of([]);
      })
    );
  }

  /**
   * Searches for tracking records based on a query string.
   * @param query The search query to filter tracking records.
   * @returns An observable of an array of matching tracking info entities.
   */
  searchTrackings(query: string): Observable<TrackingInfo[]> {
    const url = `${TrackingApiEndpoint.BASE_URL}${TrackingApiEndpoint.TRACKING}?q=${encodeURIComponent(query)}`;

    return this.http.get<TrackingResource[]>(url, this.getHttpOptions()).pipe(
      map(resources => this.trackingAssembler.toEntityList(resources)),
      catchError(error => {
        console.error('Error searching trackings:', error);
        return of([]);
      })
    );
  }

  /**
   * Updates an existing tracking record.
   * @param tracking The tracking info entity with updated data.
   * @returns An observable of the updated tracking info entity or null if the update failed.
   */
  updateTracking(tracking: TrackingInfo): Observable<TrackingInfo | null> {
    const url = `${TrackingApiEndpoint.BASE_URL}${TrackingApiEndpoint.TRACKING}/${tracking.id}`;
    const resource = this.trackingAssembler.toResource(tracking);

    return this.http.put<TrackingResource>(url, resource, this.getHttpOptions()).pipe(
      map(updatedResource => this.trackingAssembler.toEntity(updatedResource)),
      catchError(error => {
        console.error('Error updating tracking:', error);
        return of(null);
      })
    );
  }
}
