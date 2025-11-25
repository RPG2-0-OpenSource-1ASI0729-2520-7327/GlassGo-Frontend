/**
 * Environment configuration for development.
 */
export const environment = {
  /**
   * Indicates if the application is running in production mode.
   */
  production: false,
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
