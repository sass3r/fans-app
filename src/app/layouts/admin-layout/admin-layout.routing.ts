import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../autenticacion/login/login.component';
import { RegistroComponent } from '../../autenticacion/registro/registro.component';
import { PerfilComponent } from '../../usuario/perfil/perfil.component';
import { ListaPersonajesComponent } from 'src/app/personajes/lista-personajes/lista-personajes.component';
import { MiListaPersonajesComponent } from 'src/app/personajes/mi-lista-personajes/mi-lista-personajes.component';

export const AdminLayoutRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil/:id', component: PerfilComponent},
  {path: 'personajes', component: ListaPersonajesComponent},
  {path: 'mi-lista', component: MiListaPersonajesComponent}
];
