/**
 * Base response interface for API responses in the service planning bounded context.
 * @template T - The type of the data payload.
 */
export interface BaseResponse<T> {
  /** The data payload of the response. */
  data: T;
  /** A message describing the response. */
  message: string;
  /** HTTP status code. */
  status: number;
  /** Indicates if the request was successful. */
  success: boolean;
}
