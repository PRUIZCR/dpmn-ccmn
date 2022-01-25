import { HttpClient,HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dpmn } from '../model/dpmn.model';
import { Observable } from 'rxjs/internal/Observable';
import { Respuesta } from '../model/common/Respuesta';
const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CuentacorrienteService {
  
  constructor(private http:HttpClient) { }
 
  get token():string{
    return localStorage.getItem('token')||'';
  }

  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }

  private rptaDpmn: Respuesta<Dpmn> | undefined;
  // private rptaDpmnSource  = new BehaviorSubject<Respuesta<Dpmn>>(!);
  // public rptDpmn$ = this.rptaDpmnSource.asObservable();

  // public cargarDocumentos(numCorrelativo : string) {
  //   var numCorrelativoEsInvalido =  numCorrelativo == '1200' ||  numCorrelativo?.length != 6
  //   this.buscarDpmnByNumcorredoc(numCorrelativo).subscribe(objDpmn => {
  //     this.rptaDpmn = Respuesta.create(objDpmn, Estado.SUCCESS);
  //     this.rptaDpmnSource.next(this.rptaDpmn);
  // });
  // }


  buscarDpmnByNumcorredoc(numCorrelativo : string) : Observable <Dpmn> {
    var url = "http://localhost:7192/v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns" + "/" + numCorrelativo;
    return this.http.get<Dpmn>(url);
  }

  // consultarCuentacorriente(dpmn:Dpmn){
  //   return this.http.post(`${this.base_url}/listar.json`,listar)
  // } 
 
}
