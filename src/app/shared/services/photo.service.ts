import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/enviroments/enviroment';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private response: ResponseModel;
  private resource: string;
  private url: string;

  constructor(
    private autenticacionService: AutenticacionService,
    private httpClient: HttpClient,
  ) {
      this.resource = '/api/users/photo';
      this.url = environment.baseUrl+this.resource;
      this.response = new ResponseModel();
      (async ()=> {
        this.response = await this.autenticacionService.getAuthUser();
      })()
  }

  async uploadPhoto(formData: FormData) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.response.accessToken}`,
      }),
      withCredentials: false,
    };
    return await this.httpClient.post<any>(this.url,formData,httpOptions);
  }
}
