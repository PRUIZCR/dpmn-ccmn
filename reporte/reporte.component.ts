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

import {from} from 'rxjs';
import { filter } from 'rxjs/operator/filter';
import { reduce } from 'rxjs/operator/reduce';
import {map} from 'rxjs/operator/map';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

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
    this.sumaTotalFunction(this.totalesAduana);
    }
   sumaTotalFunction(data2:totalesAduanas[]):void{

     var listaAduanas: any[] = [];
  const unicos: (string | totalesAduanas)[]=[];
        let esduplicado019,esduplicado181,esduplicado172,esduplicado262=false;
        let cant172=0;
        let cant262=0;
        let cant181=0;
        let cant019=0;
      for (var i=0; i < data2.length; i++) {
     
          if (this.totalesAduana[i].concepto.codDatacat == "019"){       
             if(!listaAduanas.includes("019")){ 
              listaAduanas.push("019");    
             }else{
              cant019=this.totalesAduana[i].cantidad;
              this.lstAduanaEliminada=this.totalesAduana[i];
              esduplicado019=true;
             }
           }
          if (this.totalesAduana[i].concepto.codDatacat == "181"){
           if(!listaAduanas.includes("181")){ 
            listaAduanas.push("181");
           }else{
            cant181=this.totalesAduana[i].cantidad;
            esduplicado181=true;
           }
         }
         if (this.totalesAduana[i].concepto.codDatacat == "172"){
           if(!listaAduanas.includes("172")){ 
            listaAduanas.push("172");
           }else{
            cant172=this.totalesAduana[i].cantidad;
            esduplicado172=true;
           }
         }
         if (this.totalesAduana[i].concepto.codDatacat == "262"){
           if(!listaAduanas.includes("262")){ 
            listaAduanas.push("262");
           }else{
            cant262=this.totalesAduana[i].cantidad;
            esduplicado262=true;
           }
         }
         if(esduplicado019||esduplicado172||esduplicado262||esduplicado181){
          this.totalesAduana.splice(i,1);
          this.totalesAduana.forEach(function(item){
            if (item.concepto.codDatacat == "019"){   
                 item.cantidad+=cant019;
            }
            if (item.concepto.codDatacat == "181"){   
              item.cantidad+=cant181;
             }
             if (item.concepto.codDatacat == "172"){   
              item.cantidad+=cant172;
             }
             if (item.concepto.codDatacat == "262"){   
              item.cantidad+=cant262;
             }
          })
         }
        
     console.log('list listaAduanas: ' + this.totalesAduana);
    };
  }
  cargandoTotalesEstado(data: reporteresumido){
    this.totalesEstado=data.totalesPorEstado;
    console.log('TotalEstado' + data.totalPorEstado);
    this.totalesPorEstadoDocum=data.totalPorEstado;
    this.sumaTotalFunctionEstado(this.totalesEstado);
  }
  sumaTotalFunctionEstado(data2:totalesEstado[]):void{
    var listaAduanasEstado: any[] = [];
    let esduplicado01,esduplicado02,esduplicado03,esduplicado04,esduplicado05=false;
      let codEstRegistrada01=0;
      let codEstProceso02=0;
      let codEstAceptada03=0;
      let codEstRechazada04=0;
      let codAnulada05=0;
    for (var i=0; i < data2.length; i++) {
     
        if (this.totalesEstado[i].concepto.codDatacat == "01"){       
          if(!listaAduanasEstado.includes("01")){ 
            listaAduanasEstado.push("01");    
          }else{
            codEstRegistrada01=this.totalesEstado[i].cantidad;
           this.lstAduanaEliminada=this.totalesEstado[i];
           esduplicado01=true;
          }
        }
       if (this.totalesEstado[i].concepto.codDatacat == "02"){
        if(!listaAduanasEstado.includes("02")){ 
          listaAduanasEstado.push("02");
        }else{
          codEstProceso02=this.totalesEstado[i].cantidad;
          esduplicado02=true;
        }
      }
      if (this.totalesEstado[i].concepto.codDatacat == "03"){
        if(!listaAduanasEstado.includes("03")){ 
          listaAduanasEstado.push("03");
        }else{
          codEstAceptada03=this.totalesEstado[i].cantidad;
         esduplicado03=true;
        }
      }
      if (this.totalesEstado[i].concepto.codDatacat == "04"){
        if(!listaAduanasEstado.includes("04")){ 
          listaAduanasEstado.push("04");
        }else{
          codEstRechazada04=this.totalesEstado[i].cantidad;
         esduplicado04=true;
        }
      }
      if (this.totalesEstado[i].concepto.codDatacat == "05"){
        if(!listaAduanasEstado.includes("05")){ 
          listaAduanasEstado.push("05");
        }else{
          codAnulada05=this.totalesEstado[i].cantidad;
         esduplicado05=true;
        }
      }

      if(esduplicado01||esduplicado02||esduplicado03||esduplicado04||esduplicado05){
        this.totalesEstado.splice(i,1);
        this.totalesEstado.forEach(function(item){
          if (item.concepto.codDatacat == "01"){   
               item.cantidad+=codEstRegistrada01;
          }
          if (item.concepto.codDatacat == "02"){   
            item.cantidad+=codEstProceso02;
           }
           if (item.concepto.codDatacat == "03"){   
            item.cantidad+=codEstAceptada03;
           }
           if (item.concepto.codDatacat == "04"){   
            item.cantidad+=codEstRechazada04;
           }
           if (item.concepto.codDatacat == "05"){   
            item.cantidad+=codAnulada05;
           }
        })
       }
  
    }
  }
  cargandoTotalesTipoControl(data: reporteresumido){
    this.totalesTipoControl=data.totalesPorTipoControl;
    console.log('TipoControl' + data.totalPorTipoControl);
    this.totalesPorTipoDocum=data.totalPorTipoControl;
    this.sumaTotalFunctionTipoControl(this.totalesAduana);
  }
  sumaTotalFunctionTipoControl(data2:totalesAduanas[]):void{
    for (var i=0; i < data2.length; i++) {
      var listaAduanas: any[] = [];
      let esduplicadoFisico,esduplicadoDoc=false;
      let cantFisico=0;
      let cantDoc=0;
      if (this.totalesAduana[i].concepto.codDatacat == "F"){       
        if(!listaAduanas.includes("F")){ 
         listaAduanas.push("F");    
        }else{
          cantFisico=this.totalesAduana[i].cantidad;
         this.lstAduanaEliminada=this.totalesAduana[i];
         esduplicadoFisico=true;
        }
      }
     if (this.totalesAduana[i].concepto.codDatacat == "D"){
      if(!listaAduanas.includes("D")){ 
       listaAduanas.push("D");
      }else{
        cantDoc=this.totalesAduana[i].cantidad;
       esduplicadoDoc=true;
      }
    }

    if(esduplicadoDoc||esduplicadoFisico){
      this.totalesAduana.splice(i,1);
      this.totalesAduana.forEach(function(item){
        if (item.concepto.codDatacat == "F"){   
             item.cantidad+=cantFisico;
        }
        if (item.concepto.codDatacat == "D"){   
          item.cantidad+=cantDoc;
         }
      })
     }


    }
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
