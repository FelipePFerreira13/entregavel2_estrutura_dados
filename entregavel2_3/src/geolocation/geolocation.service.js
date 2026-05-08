import { GeolocationModel } from "./geolocation.model.js";

// É PROIBIDO IMPORTAR QUALQUER COISA ADICIONAL AQUI!

export class GeolocationService {
  constructor() {
    this.geolocationModel = new GeolocationModel();
  }

  getAll() {
    return this.geolocationModel.getAll();
  }

  getAllReversed() {
    return this.geolocationModel.getAllReversed();
  }

  getByIndex(index) {
    return this.geolocationModel.getAt(index);
  }

  create(coords) {
    this.geolocationModel.add(coords);
  }

  update(index, coords) {
    return this.geolocationModel.updateAt(index, coords);
  }

  patch(index, partialCoords) {
    return this.geolocationModel.patchAt(index, partialCoords);
  }

  delete(index) {
    return this.geolocationModel.removeAt(index);
  }

  findClosest(latitude, longitude) {
    return this.geolocationModel.findClosest(latitude, longitude);
  }
}
