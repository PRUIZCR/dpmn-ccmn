import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComprobantePago } from 'src/app/model/domain/comprobante-pago.model';
import { environment } from 'src/environments/environment';
import { ConstantesApp } from 'src/app/utils/constantes-app';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DocumentoDpmn } from 'src/app/model/domain/DocumentoDpmn';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styles: [
  ]
})
export class ReporteComponent implements OnInit {
  private URL_RESOURCE_DATOS_DECLARACION : string = environment.urlBase + ConstantesApp.RESOURCE_DATOS_DECLARACION;
  private URL_RESOURCE_DATOS_DECLARACION_CCMN : string = environment.urlBase + ConstantesApp.RESOURCE_DATOS_DECLARACION_CCMN;
  private URL_RESOURCE_ARCHIVOS_ADJUNTOS : string = environment.urlBase + ConstantesApp.RESOURCE_ARCHIVOS_ADJUNTOS;
  documentosDpmn: DocumentoDpmn;

  comprobantes: ComprobantePago[]= new Array();
  constructor(private rutaActiva: ActivatedRoute,private http: HttpClient,) { }
  numeroCorrelativoDetalle:string|null;
  numeroTipoDocum:string|null;

  ngOnInit(): void {
    this.numeroCorrelativoDetalle=this.rutaActiva.snapshot.paramMap.get('numCorrelativo');
    this.numeroTipoDocum=this.rutaActiva.snapshot.paramMap.get('tipoDocum');
    console.log('llego al reporte');
    this.getListadeDocumentos(this.numeroCorrelativoDetalle,this.numeroTipoDocum); 
  }

  getListadeDocumentos(numCorrelativoOk:string | null,numeroTipoDocum:string | null) { ///{correlativodpmn}/adjuntosdpmn{correlativodpmn}
    var urlConsultaDetalle=this.URL_RESOURCE_DATOS_DECLARACION;
    const params=new HttpParams().set('anulado',true);
    if(numeroTipoDocum=="1"){
         urlConsultaDetalle=this.URL_RESOURCE_DATOS_DECLARACION_CCMN;
    }else{
       urlConsultaDetalle=this.URL_RESOURCE_DATOS_DECLARACION;
    }
      console.log('url detalle: ' +urlConsultaDetalle)
    return this.http.get<DocumentoDpmn>(urlConsultaDetalle+numCorrelativoOk,{params}) 
    .subscribe(async data=>{ console.log('documento data detalle[0]'+this.documentosDpmn ),this.documentosDpmn=data

    
    });
  }
  exportarpdf(nomArch: string) {
   
  }
}
