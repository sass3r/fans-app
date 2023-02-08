import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      'fullName': ['',[Validators.required,Validators.maxLength(150)]],
      'nickName': ['',[Validators.required,Validators.maxLength(50)]],
      'email': ['',[Validators.required,Validators.maxLength(50)]],
      'password': ['',[Validators.required,Validators.maxLength(50)]],
      'rePassword': ['',[Validators.required,Validators.maxLength(50)]]
    });
    this.errorMessage = "";
  }

  validarPassword(form: any): boolean {
    return form.password == form.rePassword;
  }

  async onSubmit(form: any) {
    let fullName = form['fullName'];
    let nickName = form['nickName'];
    let email = form['email'];
    let password = form['password'];
    let user: UserModel = new UserModel();
    user.fullName = fullName;
    user.nickName = nickName;
    user.email = email;
    user.password = password
    if(this.registerForm.valid && this.validarPassword(form)) {
      let response = await this.userService.register(user);
      response.subscribe(data => {
          this.toastr.info('Usuario registrado satisfactoriamente');
          this.router.navigateByUrl('login');
      },(error)=> {
        this.toastr.error('Ocurrio un error inesperado intentelo de nuevo');
      });
    }else{
      this.toastr.error('Verifique que todos los campos esten llenados y que los passwords sean iguales');
    }
  }

}
