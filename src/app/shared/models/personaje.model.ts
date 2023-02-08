export class PersonajeModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: any;
  image: string;
  episode: [];
  url: string;
  create: string;
  disabled: boolean

  constructor() {
    this.id = 0;
    this.name = "";
    this.status = "";
    this.species = "";
    this.type = "";
    this.gender = "";
    this.origin = undefined;
    this.location = undefined;
    this.image = "";
    this.episode = [];
    this.url = "";
    this.create = "";
    this.disabled = false;
  }
}
