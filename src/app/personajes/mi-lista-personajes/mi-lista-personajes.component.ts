import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/shared/services/character.service';
import { CharacterModel } from 'src/app/shared/models/character.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mi-lista-personajes',
  templateUrl: './mi-lista-personajes.component.html',
  styleUrls: ['./mi-lista-personajes.component.scss']
})
export class MiListaPersonajesComponent implements OnInit {
  personajes: CharacterModel[];
  personajesFiltrados: CharacterModel[];
  serverToken: ResponseModel;
  searchForm: FormGroup;

  constructor(
    private characterService: CharacterService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.personajes = [];
    this.personajesFiltrados = [];
    this.serverToken = new ResponseModel();
    this.searchForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loadData();
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
          this.personajesFiltrados = this._filter(value);
          this.personajes = this.personajesFiltrados;
        });
     }
  }

  private _filter(value: any): CharacterModel[] {
    const filterValue = value.toLowerCase();
    const personajes = this.personajes
    const characters = personajes.filter(personaje => {
      const nombre = personaje.nombre;
      const lowerCase = nombre.toLowerCase();
      return lowerCase.includes(filterValue);
    });
    return characters;
  }

  async loadData() {
    const characterRequest = await this.characterService.findByUser();
    characterRequest.subscribe((characters: CharacterModel[])=> {
      this.personajes = characters;
    })
  }
}
