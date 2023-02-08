import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PageModel } from '../models/page.model';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    this.url = 'https://rickandmortyapi.com/api/character/';
  }

  async getPage(page: number) {
    const url = this.url + '?page=' + page;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
    };
    return await this.httpClient.get<PageModel>(url,httpOptions);
  }

  async searchByName(query: string) {
    const url = this.url + '?name=' + query;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
    };
    return await this.httpClient.get<PageModel>(url,httpOptions);
  }
}
