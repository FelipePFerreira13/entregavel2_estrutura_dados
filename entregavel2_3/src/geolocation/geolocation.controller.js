import { Router } from "express";
import { GeolocationService } from "./geolocation.service.js";

// É PROIBIDO IMPORTAR QUALQUER COISA ADICIONAL AQUI!

export class GeolocationController {
  constructor() {
    this.geolocationService = new GeolocationService();
    this.router = Router();
  }

  setupRoutes() {
    this.router.get("/", this.getAllCoords.bind(this));
    this.router.get("/reversed", this.getAllCoordsReversed.bind(this));
    this.router.get("/closest", this.getClosestCoord.bind(this));
    this.router.get("/:index", this.getCoordsByIndex.bind(this));
    this.router.delete("/:index", this.deleteCoordsByIndex.bind(this));
    this.router.put("/:index", this.updateCoordsByIndex.bind(this));
    this.router.patch("/:index", this.patchCoordsByIndex.bind(this));
    this.router.post("/", this.createCoords.bind(this));
  }

  async getAllCoords(req, res) {
    const coords = this.geolocationService.getAll();
    res.status(200).json(coords);
  }

  async getAllCoordsReversed(req, res) {
    const coords = this.geolocationService.getAllReversed();
    res.status(200).json(coords);
  }

  async getClosestCoord(req, res) {
    const { latitude, longitude } = req.query;

    if (latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .json({ message: "Latitude e longitude são obrigatórios como query params." });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "Latitude e longitude devem ser números." });
    }

    const result = this.geolocationService.findClosest(lat, lon);

    if (!result) {
      return res.status(404).json({ message: "Nenhuma coordenada cadastrada." });
    }

    res.status(200).json(result);
  }

  async getCoordsByIndex(req, res) {
    const index = parseInt(req.params.index);

    if (isNaN(index)) {
      return res.status(400).json({ message: "Índice inválido." });
    }

    const coord = this.geolocationService.getByIndex(index);

    if (!coord) {
      return res.status(404).json({ message: `Coordenada no índice ${index} não encontrada.` });
    }

    res.status(200).json(coord);
  }

  async deleteCoordsByIndex(req, res) {
    const index = parseInt(req.params.index);

    if (isNaN(index)) {
      return res.status(400).json({ message: "Índice inválido." });
    }

    const success = this.geolocationService.delete(index);

    if (!success) {
      return res.status(404).json({ message: `Coordenada no índice ${index} não encontrada.` });
    }

    res.status(200).json({ message: `Coordenada no índice ${index} deletada com sucesso.` });
  }

  async updateCoordsByIndex(req, res) {
    const index = parseInt(req.params.index);
    const coords = req.body;

    if (isNaN(index)) {
      return res.status(400).json({ message: "Índice inválido." });
    }

    if (coords.latitude === undefined || coords.longitude === undefined) {
      return res
        .status(400)
        .json({ message: "Latitude e longitude são obrigatórios para atualização completa." });
    }

    const success = this.geolocationService.update(index, coords);

    if (!success) {
      return res.status(404).json({ message: `Coordenada no índice ${index} não encontrada.` });
    }

    res.status(200).json({ message: `Coordenada no índice ${index} atualizada com sucesso.`, coords });
  }

  async patchCoordsByIndex(req, res) {
    const index = parseInt(req.params.index);
    const partialCoords = req.body;

    if (isNaN(index)) {
      return res.status(400).json({ message: "Índice inválido." });
    }

    if (partialCoords.latitude === undefined && partialCoords.longitude === undefined) {
      return res
        .status(400)
        .json({ message: "Informe ao menos latitude ou longitude para atualização parcial." });
    }

    const success = this.geolocationService.patch(index, partialCoords);

    if (!success) {
      return res.status(404).json({ message: `Coordenada no índice ${index} não encontrada.` });
    }

    res.status(200).json({ message: `Coordenada no índice ${index} atualizada parcialmente.` });
  }

  async createCoords(req, res) {
    const coords = req.body;

    if (coords.latitude === undefined || coords.longitude === undefined) {
      return res.status(400).json({ message: "Latitude e longitude são obrigatórios." });
    }

    this.geolocationService.create(coords);

    res.status(201).json({ message: "Coordenada criada com sucesso.", coords });
  }
}
