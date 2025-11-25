/**
 * Environment configuration for production.
 */
export const environment = {
  /**
   * Indicates if the application is running in production mode.
   */
  production: true,
  /**
   * Base URL for the API.
   */
  apiUrl: 'http://localhost:3000',
  /**
   * Base URL for the platform provider API.
   */
  platformProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  /**
   * Endpoint path for categories.
   */
  platformProviderCategoriesEndpointPath: '/categories',
  /**
   * Endpoint path for courses.
   */
  platformProviderCoursesEndpointPath: '/courses',
  /**
   * Endpoint path for places.
   */
  platformProviderPlacesEndpointPath: '/places'
};
