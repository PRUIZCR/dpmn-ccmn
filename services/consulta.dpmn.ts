import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda'
import { DpmnResumen } from 'src/app/model/domain/dpmn-resumen'
import { environment } from 'src/environments/environment';
import { ConstantesApp } from '../utils/constantes-app';

@Injectable({
  providedIn: 'root'
})
export class ConsultaDpmnService {
  private URL_RESOURCE_CONSULTA_DPMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_CONSULTA_DPMN;

  private dpmn: DpmnResumen[] = new Array();
  private rptDpmnResumen = new BehaviorSubject<any>(this.dpmn);
  public rptDpmnResumen$ = this.rptDpmnResumen.asObservable();

  private json: ConsultaDpmn = new ConsultaDpmn;
  private consultaJson = new BehaviorSubject<any>(this.json);
  public consultaJsonSession$ = this.consultaJson.asObservable();

  constructor(private http: HttpClient) { }

  buscarDpmns(consultaDpmn: ConsultaDpmn): Promise<any> { 
    this.rptDpmnResumen = new BehaviorSubject<any>(this.dpmn);
    this.rptDpmnResumen$ = this.rptDpmnResumen.asObservable();
    this.consultaJson.next(consultaDpmn);

    return this.buscarDeclaracionHttp(consultaDpmn).then((respuesta: any) => {
      this.rptDpmnResumen.next(respuesta);
    }).catch(err=>{});
  };


  private buscarDeclaracionHttp(consultaDpmn: ConsultaDpmn): Promise<any> {
    return this.http.post<any>(this.URL_RESOURCE_CONSULTA_DPMN, consultaDpmn).pipe(
      map(resp => {
        if('msg' in resp) {
          var err: DpmnResumen;
          err = resp;
          return err;
        }else{
          var resumenDpmn: DpmnResumen[] = new Array();
          resumenDpmn = resp;
          return resumenDpmn;
        }
      }),
      catchError((error: HttpErrorResponse) => {

        var erroresHttp = error.error;

        if(error.status!=422)
          console.log(error);

        this.rptDpmnResumen.next(erroresHttp);
        return throwError(error);
      })
    ).toPromise();
  }
}

