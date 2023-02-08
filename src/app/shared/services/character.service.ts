import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CharacterModel } from '../models/character.model';
import { ResponseModel } from '../models/response.model';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private resource: string;
  private url: string;
  private response: ResponseModel;

  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    this.resource = '/api/personajes';
    this.url = environment.baseUrl+this.resource;
    this.response = new ResponseModel();
    (async ()=> {
      this.response = await this.autenticacionService.getAuthUser();
    })()
  }

  async register(personaje: CharacterModel) {
    const response = this.response;
    const user = response.user;
    personaje.user = user._id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.post<CharacterModel>(this.url,personaje, httpOptions);
  }

  async update(personaje: CharacterModel) {
    const url = this.url + '/' + personaje._id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.put<CharacterModel>(url, personaje, httpOptions);
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
    return await this.httpClient.get<CharacterModel>(url,httpOptions);
  }

  async getAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.get<CharacterModel[]>(this.url,httpOptions);
  }

  async findByUser() {
    const response = this.response;
    const user = response.user;
    const url = this.url + '/usuario/' + user._id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.get<CharacterModel[]>(url,httpOptions);
  }
}
