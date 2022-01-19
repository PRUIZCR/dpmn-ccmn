import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ComprobantePago } from 'src/app/model/domain/comprobante-pago.model';
import { environment } from 'src/environments/environment';
import { ConstantesApp } from 'src/app/utils/constantes-app';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DocumentoDpmn } from 'src/app/model/domain/DocumentoDpmn';
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda';
import { ConsultaCcmn } from 'src/app/model/bean/param-busquedaccmn';
import { DocumentodescargaService } from 'src/app/services/documentodescarga.service';
import { reporteresumido } from '../../model/domain/reporteresumido';
import { totalesAduanas } from '../../model/domain/totalesAduana';
import { totalesEstado } from '../../model/domain/totalesEstado';
import { totalesTipoControl } from '../../model/domain/totalesTipoControl';
import { totalesUsuarioExterno } from '../../model/domain/totalesUsuarioExterno';
import { totalesFuncionarioAduanero } from '../../model/domain/totalesFuncionarioAduanero';
import { ConsultaDpmnService } from 'src/app/services/consulta.dpmn';
import { ConsultaCcmnService } from 'src/app/services/consulta.ccmn';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styles: [
  ]
})
export class ReporteComponent implements OnInit {
  [x: string]: any;
  private URL_RESOURCE_DATOS_DECLARACION : string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION;
  private URL_RESOURCE_DATOS_DECLARACION_CCMN : string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_CCMN;
  private URL_RESOURCE_ARCHIVOS_ADJUNTOS : string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_ARCHIVOS_ADJUNTOS_DPMN;
  private URL_RESOURCE_REPORTE_RESUMIDO_CCMN:string= environment.urlBaseIntranet + ConstantesApp.RESOURCE_REPORTE_RESUMIDO_CCMN;
  private URL_RESOURCE_REPORTE_RESUMIDO_DPMN:string= environment.urlBaseIntranet + ConstantesApp.RESOURCE_REPORTE_RESUMIDO_DPMN;

  totalesAduana:totalesAduanas[];
  totalesPorAduanasDocum:number=0;
  totalesEstado:totalesEstado[];
  totalesPorEstadoDocum:number=0;
  totalesTipoControl:totalesTipoControl[];
  totalesPorTipoDocum:number=0;
  totalesFuncionarioAduanero:totalesFuncionarioAduanero[];
  totalesPorFuncionarioAduanero:number=0;
  totalesUsuarioExterno:totalesUsuarioExterno[];
  totalesPorUsuarioExterno:number|null=0;
  urlConsultaDetalleTitulo="";

  public reporteresumidoCcmn: reporteresumido[]=new Array();
  documentosDpmn: DocumentoDpmn;
  comprobantes: ComprobantePago[]= new Array();
  constructor(
    private rutaActiva: ActivatedRoute,
    private http: HttpClient,
    private myService: ConsultaDpmnService,
    private myServiceCcmn: ConsultaCcmnService,
    private documentodescargaService:DocumentodescargaService) { }
  numeroCorrelativoDetalle:string|null;
  tipoDocumentoform:string|null;
  jsonConsulta: ConsultaDpmn = new ConsultaDpmn;
  jsonConsultaCcmn: ConsultaCcmn = new ConsultaCcmn;
  tipDocumForm:string|null;
  ngOnInit(): void {

    this.numeroCorrelativoDetalle=this.rutaActiva.snapshot.paramMap.get('numCorrelativo');
    this.tipoDocumentoform=this.rutaActiva.snapshot.paramMap.get('tipoDocum');
    this.rutaActiva.paramMap.subscribe((parametros:ParamMap)=>{
      this.tipDocumForm=parametros.get("tipoDocumentoform");
    })
  
    if(this.tipoDocumentoform=="1"){
      this.urlConsultaDetalleTitulo="CCMN";
     }else{
       this.urlConsultaDetalleTitulo="DPMN";
     }
 
    console.log('llego al reporte');
    var urlConsultaReporte="";
    if(this.tipoDocumentoform=="1"){
      urlConsultaReporte=this.URL_RESOURCE_REPORTE_RESUMIDO_CCMN;
      this.getReporteResumido(this.jsonConsultaCcmn,this.tipoDocumentoform,urlConsultaReporte); 
    }else{
      urlConsultaReporte=this.URL_RESOURCE_REPORTE_RESUMIDO_DPMN;
      this.getReporteResumidoDpmn(this.jsonConsulta,this.tipoDocumentoform,urlConsultaReporte); 
    }
  }

  getReporteResumido(datos: ConsultaCcmn,tipoDocumentoform:string | null,urlConsultaReporte:string) { ///{correlativodpmn}/adjuntosdpmn{correlativodpmn}
      this.myServiceCcmn.consultaJsonSession$.subscribe((datos: ConsultaCcmn) => this.jsonConsultaCcmn = datos);
    return this.http.post<reporteresumido>(urlConsultaReporte, this.jsonConsultaCcmn
      ) 
    .subscribe(async data=>{ 
    this.reporteresumidoCcmn.push(data);
    console.log('documento reporte es' + this.reporteresumidoCcmn);
    this.cargandoTotalesAduana(data);
    this.cargandoTotalesEstado(data);
    this.cargandoTotalesTipoControl(data);
    this.cargandoTotalesFuncionarioAduanero(data);
    this.cargandoTotalesUsuarioExterno(data);
    });
  }
  getReporteResumidoDpmn(datos: ConsultaDpmn,tipoDocumentoform:string | null,urlConsultaReporte:string) { ///{correlativodpmn}/adjuntosdpmn{correlativodpmn}
    this.myService.consultaJsonSession$.subscribe((datos: ConsultaDpmn) => this.jsonConsulta = datos);
  return this.http.post<reporteresumido>(urlConsultaReporte, this.jsonConsulta
    ) 
  .subscribe(async data=>{ 
  this.reporteresumidoCcmn.push(data);
  console.log('documento reporte es' + this.reporteresumido);
  this.cargandoTotalesAduana(data);
  this.cargandoTotalesEstado(data);
  this.cargandoTotalesTipoControl(data);
  this.cargandoTotalesFuncionarioAduanero(data);
  this.cargandoTotalesUsuarioExterno(data);
  });
  }

  cargandoTotalesAduana(data: reporteresumido){
    this.totalesAduana=data.totalesPorAduana;
    console.log('Totaladuana' + this.totalesAduana);
    this.totalesPorAduanasDocum=data.totalPorAduana;
  }
  cargandoTotalesEstado(data: reporteresumido){
    this.totalesEstado=data.totalesPorEstado;
    console.log('TotalEstado' + data.totalPorEstado);
    this.totalesPorEstadoDocum=data.totalPorEstado;
  }
  cargandoTotalesTipoControl(data: reporteresumido){
    this.totalesTipoControl=data.totalesPorTipoControl;
    console.log('TipoControl' + data.totalPorTipoControl);
    this.totalesPorTipoDocum=data.totalPorTipoControl;
  }
  cargandoTotalesFuncionarioAduanero(data: reporteresumido){
    this.totalesFuncionarioAduanero=data.totalesPorFuncionarioAduanero;
    console.log('FuncionarioAduanero' + data.totalPorFuncionarioAduanero);
    this.totalesPorFuncionarioAduanero=data.totalPorFuncionarioAduanero;
  }
  cargandoTotalesUsuarioExterno(data: reporteresumido){
    this.totalesUsuarioExterno=data.totalesPorUsuarioExterno;
    console.log('totalesPorUsuarioExterno' + data.totalesPorUsuarioExterno);
    this.totalesPorUsuarioExterno=data.totalPorUsuarioExterno;
  }
  exportarpdfResumido(nomArch: string) {
    this.documentos = new Array();
      if(this.tipoDocumentoform=="1"){
        this.myServiceCcmn.consultaJsonSession$.subscribe(datos => this.jsonConsultaCcmn = datos);
        this.documentodescargaService.getDocumentoDescargaPdfResumido(nomArch, this.jsonConsultaCcmn,this.tipoDocumentoform);
    }else{
        this.myService.consultaJsonSession$.subscribe(datos => this.jsonConsulta = datos);
        this.documentodescargaService.getDocumentoDescargaPdfResumido(nomArch, this.jsonConsulta,this.tipoDocumentoform);
    }

  }
  retornar(){
    this.router.navigate(['/condpmn/lista', this.tipoDocumentoform])
  }
}
