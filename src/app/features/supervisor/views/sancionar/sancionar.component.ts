import { Component, OnInit } from '@angular/core';
import { Sancion } from 'src/app/models/sancion';

@Component({
  selector: 'app-sancionar',
  templateUrl: './sancionar.component.html',
  styleUrls: ['./sancionar.component.css']
})
export class SancionarComponent implements OnInit {

  sancion:Sancion = new Sancion();
  constructor() { }

  ngOnInit(): void {
  }

  sancionDetalle:Sancion = null;
  verDetalle(sancion)
  {

  }
}
