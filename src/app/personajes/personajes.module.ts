import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { AgregarPersonajeComponent } from './agregar-personaje/agregar-personaje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MiListaPersonajesComponent } from './mi-lista-personajes/mi-lista-personajes.component';


@NgModule({
  declarations: [
    ListaPersonajesComponent,
    IntersectionObserverDirective,
    AgregarPersonajeComponent,
    MiListaPersonajesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ]
})
export class PersonajesModule { }
