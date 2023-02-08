import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { CommunicationService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private autenticacionService: AutenticacionService,
    private communicationService: CommunicationService
  ) {
    this.loginForm = this.formBuilder.group({
      'email': ['',[Validators.required,Validators.maxLength(50)]],
      'password': ['',[Validators.required,Validators.maxLength(50)]],
    });
    this.errorMessage = "";
  }

  async onSubmit(form: any) {
    let email = form['email'];
    let password = form['password'];
    if(this.loginForm.valid) {
      let response = await this.autenticacionService.login(email,password);
      response.subscribe((data: ResponseModel) => {
        const user = data.user
        this.communicationService.emitChange({topic: 'login', msg: user._id});
        this.router.navigate(['/perfil',user._id]);
      },(error)=> {
        this.toastr.error('Password incorrecto o Email no encontrado');
      });
    }
  }

  registrarCuenta() {
    this.router.navigateByUrl('registro');
  }
}
