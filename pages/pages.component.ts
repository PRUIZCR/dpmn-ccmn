
import { Component, OnInit } from '@angular/core';
import { ConsultaDpmnService } from 'src/app/services/consulta.dpmn'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ],
  providers: [ConsultaDpmnService]
})
export class PagesComponent implements OnInit {

  

  ngOnInit(): void {
    const url='http://api.sunat.gob.pe';
  }

}
