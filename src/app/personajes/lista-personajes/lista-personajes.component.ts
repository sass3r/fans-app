import { Component, OnInit } from '@angular/core';
import { PersonajeModel } from 'src/app/shared/models/personaje.model';
import { PersonajeService } from 'src/app/shared/services/personaje.service';
import { PageModel } from 'src/app/shared/models/page.model';
import { AgregarPersonajeComponent } from '../agregar-personaje/agregar-personaje.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss']
})
export class ListaPersonajesComponent implements OnInit {
  pagination: number;
  limit: number;
  personajes: PersonajeModel[];
  serverToken: ResponseModel;
  searchForm: FormGroup;

  constructor(
    private personajeService: PersonajeService,
    private dialog: MatDialog,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.pagination = 1;
    this.limit = 1;
    this.personajes = [];
    this.serverToken = new ResponseModel();
    this.searchForm = new FormGroup({});
  }

  ngOnInit(): void {
    (async () => {
      this.serverToken = await this.autenticacionService.getAuthUser();
      if(!this.serverToken){
        this.router.navigateByUrl('login');
      }
    })();
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      search: ['']
     });

     const searchField = this.searchForm.get('search');
     if(searchField){
        searchField.valueChanges.subscribe(value => {
          this.personajeService.searchByName(value)
          .then((searchObservable)=>{
            searchObservable.subscribe((page: PageModel) => {
              this.personajes = page.results;
            })
          })
        });
     }
  }

  nextPage() {
    this.pagination = this.pagination + this.limit;
  }

  async loadData() {
    const personajeRequest = await this.personajeService.getPage(this.pagination);
    personajeRequest.subscribe((page: PageModel)=> {
      const personajes = page.results;
      personajes.forEach((personaje: PersonajeModel) => {
        this.personajes.push(personaje);
      });
    })
    this.nextPage();
  }

  isIntersecting (status: boolean) {
    if(status) {
      this.loadData();
    }
  }

  parseNumber(url: string) {
    const len = url.length;
    const index = url.search(/[0-9]+/);
    return url.substring(index,len);
  }

  addCharacter(index: number) {
    const personaje = this.personajes[index];
    const dialogRef = this.dialog.open(AgregarPersonajeComponent, {
      width: '270px',
      data: {personaje: personaje}
    });
  }

}
