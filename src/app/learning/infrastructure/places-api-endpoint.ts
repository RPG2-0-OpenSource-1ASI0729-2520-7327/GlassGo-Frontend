import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Place} from '../domain/model/place.entity';
import {PlacesResponse, PlaceResource} from './places-response';
import {PlaceAssembler} from './place-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const placesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderPlacesEndpointPath}`;
export class PlacesApiEndpoint extends BaseApiEndpoint<Place, PlaceResource, PlacesResponse, PlaceAssembler> {
  constructor(http: HttpClient) {
    super(http, placesEndpointUrl, new PlaceAssembler());
  }
}
