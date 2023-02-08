import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { ResponseModel } from '../models/response.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private authUser: any;
  private resource: string;
  private url: string;

  constructor(
    private httpClient: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    this.resource = '/api/login';
    this.url = environment.baseUrl+this.resource;
    this.authUser = new ResponseModel();
  }

  async login(email: string, password: string) {
    let user: LoginModel = new LoginModel();
    user.email = email;
    user.password = password;
    const serverResponse = await this.httpClient.post<ResponseModel>(this.url,user);
    serverResponse.subscribe(async (data) => {
      this.authUser = data;
      await this.sessionStorage.set('authData', data);
    });
    return serverResponse;
  }

  logout() {
    this.sessionStorage.clearStorage();
  }

  async getAuthUser() {
    return await this.sessionStorage.get('authData');
  }

}
