/**
 * Base class for API endpoints in the service planning bounded context.
 * Provides common configuration for API communication.
 */
export class BaseApiEndpoint {
  /**
   * The base URL for the API.
   */
  protected baseUrl: string = 'http://localhost:3000';

  /**
   * Creates an instance of BaseApiEndpoint.
   */
  constructor() {}
}
