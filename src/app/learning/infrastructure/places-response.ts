import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface PlaceResource extends BaseResource {
  id: number;
  name: string;
  address: string;
}

export interface PlacesResponse extends BaseResponse {
  places: PlaceResource[];
}
