import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/my.service';
import { equalValueValidator } from 'src/app/utils/equal-value-validator';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.css']
})
export class MicuentaComponent implements OnInit {

  claveForm = this.formBuilder.group({
    clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    claveConfirmacion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]]
  }, {validators: equalValueValidator('clave', 'claveConfirmacion')});


  constructor(private myService:MyService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  cambiarPassword()
  {
    this.myService.changeMyPassword({clave: this.claveForm.get('clave').value}).then(response=>
    {
      alert("Nueva contraseña funcionando.");
    });
  }
}
