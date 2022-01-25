import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { DocumentoDescarga } from '../model/domain/DocumentoDescarga';
import { DocumentoDpmn } from '../model/domain/DocumentoDpmn';
import { DocumentoAdjuntoDpmn } from '../model/domain/adjunto-dpmn.model';
import { ConstantesApp } from 'src/app/utils/constantes-app';
import { SerieDeclaracionDpmn } from '../model/domain/serie-declaracion';
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda';
import { environment } from 'src/environments/environment';
import { ConsultaCcmn } from '../model/bean/param-busquedaccmn';
import { reporteresumido } from '../model/domain/reporteresumido';
@Injectable({
  providedIn: 'root'
})
export class DocumentodescargaService {
  [x: string]: any;
  // localUrl1= 'v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/listar';
  // localUrl2= 'v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/';
  private ccmnresumen: reporteresumido[] = new Array();

  localUrl1= '/v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/1200';
  localUrl2= '/v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/1200';
  params=new HttpParams().set('anulado',true);
  private URL_RESOURCE_LISTA_DOCUMENTOS_DPMNS: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_CONSULTA_DPMN + "/";
  private URL_RESOURCE_DOCUMENTO_ADJUNTO: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION;
  private URL_RESOURCE_ARCHIVOS_ADJUNTOS: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION;
  private URL_RESOURCE_DATOS_DECLARACION: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION;
  private URL_RESOURCE_DATOS_EXPORT_PDF: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_EXPORT_PDF;
  private URL_RESOURCE_DATOS_EXPORT_EXCEL: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_EXPORT_EXCEL;
  private URL_RESOURCE_DOCUMENTO_ADJUNTO_DPMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_ARCHIVOS_ADJUNTOS_DPMN;
 

  private URL_RESOURCE_DOCUMENTO_ADJUNTO_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_ARCHIVOS_ADJUNTOS_CCMN
  private URL_RESOURCE_DATOS_DECLARACION_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_CCMN;
  private URL_RESOURCE_DATOS_EXPORT_PDF_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_EXPORT_PDF_CCMN
  private URL_RESOURCE_DATOS_EXPORT_EXCEL_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_EXPORT_EXCEL_CCMN;
  private URL_RESOURCE_REPORTE_RESUMIDO_CCMN:string=environment.urlBaseIntranet + ConstantesApp.RESOURCE_REPORTE_RESUMIDO_CCMN;
  private URL_RESOURCE_REPORTE_RESUMIDO_DPMN:string=environment.urlBaseIntranet + ConstantesApp.RESOURCE_REPORTE_RESUMIDO_DPMN;
  constructor(private http: HttpClient) { }

  getDocumentoDescarga() {
    return this.http.post<DocumentoDescarga>
      (this.URL_RESOURCE_LISTA_DOCUMENTOS_DPMNS, {
        "indicadorPorFecha": true,
        "fechaDeInicioConsulta": "01/01/2021",
        "fechaFinConsulta": "04/01/2021"
      })
      .pipe(
        map((resp: any) => this.crearDocumento(resp))
      );
  }


  private crearDocumento(resp: any) {
    const documentos: DocumentoDescarga[] = [];
    Object.keys(resp).forEach(key => {
      const docu: DocumentoDescarga = resp[key];
      docu.estado.codDatacat = key;
      documentos.push(docu);
    });
    return documentos;

  }
  getDocumentoDescargaByNumcorredoc(numCorrelativo: string | null) {
    const params=new HttpParams().set('anulado',true);
    return this.http.get<DocumentoDpmn>
      (this.URL_RESOURCE_DOCUMENTO_ADJUNTO + numCorrelativo,{params})
      .pipe(
        map(
          (resp: DocumentoDpmn) => this.crearDocumentoDpmn(resp)
        )
      )
  }
  private crearDocumentoDpmn(resp: any) {
    const documentosDPMN: DocumentoDpmn[] = [];

    Object.keys(resp).forEach(key => {
      const docuDpmn: DocumentoDpmn = resp[key];
      // if(resp===null){  return []; }
      // docuDpmn.numCorrelativo=key;
      documentosDPMN.push(docuDpmn);

    });
    return documentosDPMN;
  }


  getDocumentoAdjuntoByNumcorredoc(numCorrelativo: string | null) {
    return this.http.get<DocumentoAdjuntoDpmn>
    (this.URL_RESOURCE_DOCUMENTO_ADJUNTO_DPMN+"/" + numCorrelativo+ "/" + "adjuntosdpmn")
      .pipe(
        map(
          (resp: DocumentoAdjuntoDpmn) => this.crearDocumentoAdjuntoDpmn(resp)
        )
      )
  }

getDocumentoAdjuntoByNumcorredocCcmn(numCorrelativo: string | null){
    return this.http.get<DocumentoAdjuntoDpmn>
    (this.URL_RESOURCE_DOCUMENTO_ADJUNTO_CCMN+"/" + numCorrelativo+ "/" + "adjuntosccmn")
    .pipe(
      map(
        (resp:DocumentoAdjuntoDpmn)=>this.crearDocumentoAdjuntoDpmn(resp)
      )
    )
  }
  private crearDocumentoAdjuntoDpmn(resp: any) {
    const documentosAdjuntosDPMN: DocumentoAdjuntoDpmn[] = [];
    Object.keys(resp).forEach(key => {
      const docuAdjuntoDpmn: DocumentoAdjuntoDpmn = resp[key];
      // if(resp===null){  return []; }
      // docuDpmn.numCorrelativo=key;
      documentosAdjuntosDPMN.push(docuAdjuntoDpmn);
    });
    return documentosAdjuntosDPMN;
  }
    

  getSeriesDeclaracionByNumcorredoc(numCorrelativo: string | null) {
    return this.http.get<SerieDeclaracionDpmn>
      (this.URL_RESOURCE_DATOS_DECLARACION + numCorrelativo + "/" + "damseriesdpmn")
      .pipe(
        map(
          (resp: SerieDeclaracionDpmn) => this.crearSerieDeclaracionDpmn(resp)
        )
      )
  }
getSeriesDeclaracionByNumcorredocCCMN(numCorrelativo: string | null) {
      return this.http.get<SerieDeclaracionDpmn>
        (this.URL_RESOURCE_DATOS_DECLARACION_CCMN + numCorrelativo + "/" + "damseriesccmn")
        .pipe(
          map(
            (resp: SerieDeclaracionDpmn) => this.crearSerieDeclaracionDpmn(resp)
          )
        )
    }

  private crearSerieDeclaracionDpmn(resp: any) {
    const SerieDeclaracionDpmn: SerieDeclaracionDpmn[] = [];
    Object.keys(resp).forEach(key => {
      const docuAdjuntoDpmn: SerieDeclaracionDpmn = resp[key];
      // if(resp===null){  return []; }
      // docuDpmn.numCorrelativo=key;
      SerieDeclaracionDpmn.push(docuAdjuntoDpmn);
    });
    return SerieDeclaracionDpmn;
  }

getDocumentoDescargaPdf(nomArch: string, datos: ConsultaDpmn,tipoDoc:string|null) {
    if(tipoDoc=="1"){
      this.http.post(this.URL_RESOURCE_DATOS_EXPORT_PDF_CCMN, datos, {
        responseType: 'blob'
        })
        .subscribe(Blob => {
          saveAs(Blob, nomArch);
        });
    }else{
      this.http.post(this.URL_RESOURCE_DATOS_EXPORT_PDF, datos, {
        responseType: 'blob'
        })
        .subscribe(Blob => {
          saveAs(Blob, nomArch);
        });
    }
   
}

  getDocumentoDescargaPdfResumido(nomArch: string, datos: ConsultaDpmn,tipoDoc:string|null) {
    if(tipoDoc=="1"){
      this.http.post(this.URL_RESOURCE_DATOS_EXPORT_PDF_CCMN_RESUMIDO, datos, {
        responseType: 'blob'
        })
        .subscribe(Blob => {
          saveAs(Blob, nomArch);
        });
    }else{
      this.http.post(this.URL_RESOURCE_DATOS_EXPORT_PDF_RESUMIDO, datos, {
        responseType: 'blob'
        })
        .subscribe(Blob => {
          saveAs(Blob, nomArch);
        });
    }
  
}
    getDocumentoDescargaEXcel(nomArch: string, datos: ConsultaDpmn,tipoDoc:string|null) {
      if(tipoDoc=="1"){
        this.http.post(this.URL_RESOURCE_DATOS_EXPORT_EXCEL_CCMN, datos, {
          responseType: 'blob'
        })
          .subscribe(Blob => {
            saveAs(Blob, nomArch);
          });
      }else{
        this.http.post(this.URL_RESOURCE_DATOS_EXPORT_EXCEL, datos, {
          responseType: 'blob'
        })
          .subscribe(Blob => {
            saveAs(Blob, nomArch);
          });
      }
  }

getDocumentoReporteResumido(consultaCcmn: ConsultaCcmn,tipoDoc:string|null, urlreporte:string){  
  this.reporteCcmnResumen = new BehaviorSubject<any>(this.reporteresumidoCcmn);
  this.reporteCcmnResumen$ = this.reporteCcmnResumen.asObservable();
 
  if(tipoDoc=="1"){
    this.buscarReporteResumidoHttpCcmn(consultaCcmn,urlreporte).then((respuesta: any) => {
      console.log(this.reporteCcmnResumen);
      this.reporteCcmnResumen.next(respuesta);      
    }).catch(err=>{});
  }else{
    this.buscarReporteResumidoHttp(consultaCcmn,urlreporte).then((respuesta: any) => {
      console.log(this.reporteCcmnResumen);
      this.reporteCcmnResumen.next(respuesta);      
    }).catch(err=>{});
  }
}
    
private buscarReporteResumidoHttp(consultaCcmn: ConsultaCcmn,urlreporte:string): Promise<any> {
  return this.http.post<any>(this.URL_RESOURCE_REPORTE_RESUMIDO_DPMN, consultaCcmn).pipe(
    map(resp => {
      console.log('reporte',JSON.stringify(resp));
      if('msg' in resp) {
        var err: reporteresumido;
        err = resp;
        return err;
      }else{
        var resumenCcmn: reporteresumido[] = new Array();
        resumenCcmn = resp;
        return resumenCcmn;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      var erroresHttp = error.error;
      if(error.status!=422)
        console.log(error);
      this.rptCcmnResumen.next(erroresHttp);
      return throwError(error);
    })
  ).toPromise();
}
private buscarReporteResumidoHttpCcmn(consultaCcmn: ConsultaCcmn,urlreporte:string): Promise<any> {
  return this.http.post<any>(this.URL_RESOURCE_REPORTE_RESUMIDO_CCMN, consultaCcmn).pipe(
    map(resp => {
      console.log('reporte',JSON.stringify(resp));
      if('msg' in resp) {
        var err: reporteresumido;
        err = resp;
        return err;
      }else{
        var resumenCcmn: reporteresumido[] = new Array();
        resumenCcmn = resp;
        return resumenCcmn;
    }
    }),
    catchError((error: HttpErrorResponse) => {
      var erroresHttp = error.error;
      if(error.status!=422)
        console.log(error);
      this.rptCcmnResumen.next(erroresHttp);
      return throwError(error);
    })
  ).toPromise();
}


}
