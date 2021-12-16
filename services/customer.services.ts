import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import {map,catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }

    getCustomersLarge() {
        return this.http.get<any>('./../assets/data/customers-large.json')
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }

    
    getListadeDocumentos(){
      return  new Promise (resolve=>{
  
        fetch('https://reqres.in/api/users')
        .then(resp=>resp.json())
        .then(body=>resolve(body.data));
      });
  
    }
    getListadeDocumentosParams(){
      let  params =new HttpParams().append('page','3');
      params=params.append('nombre','Paul Ruiz');
      const headers=new HttpHeaders({
        'token-usuario':'ABC1230459'
      });
      return  this.http.get('https://reqres.in/api/users',{
        params,
        headers
      }).pipe(
        map ((resp:any)=>resp['data']),
        catchError( this.manejarError)
      );
    }

    manejarError(error:HttpErrorResponse){
      console.log('Sucedio un error en el log file');
      console.log('Registrado en el log File');
      console.warn('error');
    return throwError('Error personalizado');
    };
    
}


