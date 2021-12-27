import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  loginForm:FormGroup;
  constructor(private authService:AuthService, formBuilder:FormBuilder, private route: Router) {
    this.loginForm = formBuilder.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  login()
  {

    const loginObject = new Login(this.loginForm.get('usuario').value, this.loginForm.get('clave').value);
    this.authService.loginPost(loginObject).then((res)=>
    {
      this.authService.validLogin.next(true);
      localStorage.setItem('usuario', res.data.usuario);
      //localStorage.setItem('rol', res.data.rol)
      localStorage.setItem('nombre', res.data.nombre);
      localStorage.setItem('apellido', res.data.apellido);
      //localStorate.setItem('rango', res.data.rango);
      this.route.navigateByUrl('supervisor/valoracionoficial');
    }).catch((res)=>
    {
      alert("Credenciales incorrectas");
    });
  }

}
