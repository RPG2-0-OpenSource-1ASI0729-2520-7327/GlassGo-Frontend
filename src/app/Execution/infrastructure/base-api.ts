import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from './base-response';

/**
 * Base infrastructure service for API operations in the Execution bounded context.
 * Provides common HTTP configuration and request handling utilities for API services.
 */
@Injectable({
  providedIn: 'root'
})
export class BaseApi {
  /** HTTP headers configured for API requests. */
  protected httpHeaders: HttpHeaders;

  /**
   * Constructs the BaseApi with HTTP client dependency.
   * Initializes default HTTP headers for JSON content.
   * @param http The Angular HTTP client for making requests.
   */
  constructor(protected http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  /**
   * Returns the configured HTTP options for requests.
   * @returns Object containing HTTP headers.
   */
  protected getHttpOptions() {
    return {
      headers: this.httpHeaders
    };
  }

  /**
   * Handles and potentially transforms HTTP requests.
   * Currently returns the observable as-is, but can be extended for common request processing.
   * @param observable The HTTP request observable to handle.
   * @returns The processed observable.
   */
  protected handleRequest<T>(observable: Observable<any>): Observable<T> {
    return observable;
  }
}
