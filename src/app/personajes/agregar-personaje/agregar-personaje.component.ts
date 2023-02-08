import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CharacterModel } from 'src/app/shared/models/character.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { PersonajeModel } from 'src/app/shared/models/personaje.model';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-agregar-personaje',
  templateUrl: './agregar-personaje.component.html',
  styleUrls: ['./agregar-personaje.component.scss']
})
export class AgregarPersonajeComponent {

  characterForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AgregarPersonajeComponent>,
    private toastr: ToastrService,
    private characterService: CharacterService,
    @Inject(MAT_DIALOG_DATA) public data: CharacterModalPayload
  ) {
      this.characterForm = new FormGroup({});
      this.errorMessage = "";
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.characterForm = this.formBuilder.group({
      'calificacion': [0,[Validators.required]],
      'comentario': ["",[Validators.required]],
    });
  }

  async accept() {
    let personaje: PersonajeModel = this.data.personaje;
    const calificacionField = this.characterForm.get('calificacion');
    const comentarioField = this.characterForm.get('comentario');
    let character = new CharacterModel();
    character.nombre = personaje.name;
    character.imagen = personaje.image;
    if(this.characterForm.valid) {
      if(calificacionField)
        character.calificacion = calificacionField.value;
      if(comentarioField)
        character.comentario = comentarioField.value;
      const registerCharacter = await this.characterService.register(character);
      registerCharacter.subscribe(
        () => {
          personaje.disabled=true;
          this.toastr.info("Personaje agregado");
          this.dialogRef.close(true);
        },
        e => this.toastr.error(e.message, ''),
      );
    }
  }

}

export interface CharacterModalPayload {
  personaje: PersonajeModel;
}
