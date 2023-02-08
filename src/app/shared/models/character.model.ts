export class CharacterModel {
  nombre: string;
  imagen: string;
  calificacion: number;
  comentario: string;
  _id: string;
  user: string;


  constructor() {
    this.nombre = "";
    this.imagen = "";
    this.calificacion = 0;
    this.comentario = "";
    this._id = "";
    this.user = "";
  }
}
