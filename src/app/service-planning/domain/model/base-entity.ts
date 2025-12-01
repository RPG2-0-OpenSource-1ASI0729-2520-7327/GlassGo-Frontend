export abstract class BaseEntity {
  id: number = 0;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(id: number = 0) {
    this.id = id;
  }
}
