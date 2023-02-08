import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { ResponseModel } from '../models/response.model';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private resource: string;
  private url: string;
  private response: ResponseModel;

  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    this.resource = '/api/users';
    this.url = environment.baseUrl+this.resource;
    this.response = new ResponseModel();
    (async ()=> {
      this.response = await this.autenticacionService.getAuthUser();
    })()
  }

  async register(user: UserModel) {
    const serverResponse = await this.httpClient.post<UserModel>(this.url,user);
    return serverResponse;
  }

  async update(user: UserModel) {
    const url = this.url + '/' + user._id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.put<UserModel>(url, user, httpOptions);
  }

  async findOne(id: string) {
    let url = this.url + '/' + id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.get<UserModel>(url,httpOptions);
  }
}
