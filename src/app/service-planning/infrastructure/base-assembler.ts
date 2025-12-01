export abstract class BaseAssembler<T, R> {
  abstract toDomainModel(resource: R): T;
  abstract toResource(domainModel: T): R;

  toDomainModels(resources: R[]): T[] {
    return resources.map(resource => this.toDomainModel(resource));
  }

  toResources(domainModels: T[]): R[] {
    return domainModels.map(domainModel => this.toResource(domainModel));
  }
}
