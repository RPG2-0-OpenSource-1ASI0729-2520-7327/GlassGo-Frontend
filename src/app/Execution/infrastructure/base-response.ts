/**
 * Base response interface for API responses in the Execution bounded context.
 * Standardizes the structure of responses from external APIs.
 * @template T The type of data contained in the response.
 */
export interface BaseResponse<T = any> {
  /** The data payload of the response. */
  data: T;
  /** Indicates whether the request was successful. */
  success: boolean;
  /** Optional message providing additional information about the response. */
  message?: string;
  /** Optional array of error messages if the request failed. */
  errors?: string[];
}
