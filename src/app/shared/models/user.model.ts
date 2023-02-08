import { LoginModel } from "./login.model";
export class UserModel extends LoginModel {
  fullName: string;
  nickName: string;
  foto: string;
  _id: string;
  constructor() {
    super();
    this.fullName = "";
    this.nickName = "";
    this.foto = "";
    this._id = "";
  }
}
