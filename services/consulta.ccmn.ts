import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConsultaCcmn } from 'src/app/model/bean/param-busquedaccmn';
import { CcmnResumen } from 'src/app/model/domain/ccmn-resumen';
import { environment } from 'src/environments/environment';
import { ConstantesApp } from '../utils/constantes-app';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCcmnService {
  //private RESOURCE_CONSULTA_DPMN: string = "/v1/controladuanero/prevencion/cuentacorrienteimpo/t/consultadpmn/generarreporte";
  //private RESOURCE_CONSULTA_DPMN: string = "/v1/controladuanero/prevencion/cuentacorrienteimpo/t/consultadpmn/generarreporte";
  private RESOURCE_CONSULTA_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_CONSULTA_CCMN;

  private ccmn: CcmnResumen[] = new Array();
  private rptCcmnResumen = new BehaviorSubject<any>(this.ccmn);
  public rptCcmnResumen$ = this.rptCcmnResumen.asObservable();

  private json: ConsultaCcmn = new ConsultaCcmn;
  private consultaJson = new BehaviorSubject<any>(this.json);
  public consultaJsonSession$ = this.consultaJson.asObservable();

  constructor(private http: HttpClient) { }

  buscarCcmns(consultaCcmn: ConsultaCcmn): Promise<any> {
    this.rptCcmnResumen = new BehaviorSubject<any>(this.ccmn);
    this.rptCcmnResumen$ = this.rptCcmnResumen.asObservable();
    this.consultaJson.next(consultaCcmn);

    return this.buscarDeclaracionHttp(consultaCcmn).then((respuesta: any) => {
      console.log(this.rptCcmnResumen);
      this.rptCcmnResumen.next(respuesta);      
    }).catch(err=>{});
  };


  private buscarDeclaracionHttp(consultaCcmn: ConsultaCcmn): Promise<any> {
    return this.http.post<any>(this.RESOURCE_CONSULTA_CCMN, consultaCcmn).pipe(
      map(resp => {
        if('msg' in resp) {
          var err: CcmnResumen;
          err = resp;
          return err;
        }else{
          var resumenCcmn: CcmnResumen[] = new Array();
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

