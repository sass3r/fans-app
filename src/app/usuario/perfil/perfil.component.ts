import { Component, ElementRef, Inject, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  uploadForm: FormGroup;
  errorMessage: string;
  user: UserModel;
  serverToken: ResponseModel;
  id: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private el: ElementRef,
    private userService: UserService,
    private photoService: PhotoService,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = new UserModel();
    this.perfilForm = new FormGroup({});
    this.uploadForm = new FormGroup({});
    this.errorMessage = "";
    this.id = "";
    this.serverToken = new ResponseModel();
  }

  ngOnInit(): void {
    (async () => {
      this.serverToken = await this.autenticacionService.getAuthUser();
      if(!this.serverToken){
        this.router.navigateByUrl('login');
      }
    })();
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.userService.findOne(this.id)
      .then((observable) => {
          observable.subscribe(user => {
            this.user = user;
            this.buildForm();
          });
      })
      .catch((error) => {
        console.error(error);
      })
    }
    this.buildForm();
  }

  buildForm() {
    this.perfilForm = this.formBuilder.group({
      'fullName': [this.user.fullName,[Validators.required,Validators.maxLength(150)]],
      'nickName': [this.user.nickName,[Validators.required,Validators.maxLength(50)]],
      'email': [this.user.email,[Validators.required,Validators.maxLength(50)]],
      'foto': [this.user.foto,[Validators.required,Validators.maxLength(150)]],
    });

    this.uploadForm = this.formBuilder.group({
      photo: ['']
     });
  }


  async onSubmit(form: any) {
    let fullName = form['fullName'];
    let nickName = form['nickName'];
    let email = form['email'];
    let foto = form['foto'];
    const user = this.user;
    user.fullName = fullName;
    user.nickName = nickName;
    user.email = email;
    user.foto = foto
    if(this.perfilForm.valid) {
      let response = await this.userService.update(user);
      response.subscribe(data => {
          this.toastr.info('Perfil actualizado satisfactoriamente');
      },(error)=> {
        this.toastr.error('Ocurrio un error inesperado intentelo de nuevo');
      });
    }
  }

  async submitPhoto() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let formData = new FormData();
    let files = inputEl.files;
    if(files) {
      let name;
      const item = files.item(0)
      if(item) {
        formData.append('file', item);
      }
      const perfilForm = this.perfilForm;
      const nameField = perfilForm.get('nickName');
      if(nameField) {
        name = nameField.value
      }
      name = name+".jpg";
      formData.append('name',name);
      let photoUpload = await this.photoService.uploadPhoto(formData);
      photoUpload.subscribe((success) => {
        const photoField = perfilForm.get('foto');
        if(photoField)
          photoField.setValue(success.url);
        let user = this.user;
        user.foto = success.url
      });
    }
  }

  onFileChange(fileChangeEvent: Event) {
    const uploadForm = this.uploadForm;
    const target: HTMLInputElement = fileChangeEvent.target as HTMLInputElement;
    if(target) {
      const files = target.files;
      if(files) {
        if (files.length > 0) {
          const photo = files[0];
          this.submitPhoto();
        }
      }
    }
  }
}
