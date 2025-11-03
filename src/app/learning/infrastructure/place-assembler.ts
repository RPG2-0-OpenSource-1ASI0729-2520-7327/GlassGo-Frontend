import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {PlaceResource, PlacesResponse} from './places-response';
import {Place} from '../domain/model/place.entity';

export class PlaceAssembler implements BaseAssembler<Place, PlaceResource, PlacesResponse>{
  toEntitiesFromResponse(response: PlacesResponse): Place[] {
      throw new Error("Method not implemented.");
  }
  toEntityFromResource(resource: PlaceResource): Place {
    return new Place({ id: resource.id, name: resource.name, address: resource.address });
  }
  toEntityFromResponse(response: PlacesResponse): Place[] {
    return response.places.map(placeResource => this.toEntityFromResource(placeResource));
  }
  toResourceFromEntity(entity: Place): PlaceResource {
    return { id: entity.id, name: entity.name, address: entity.address };
  }
}

