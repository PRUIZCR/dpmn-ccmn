import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl:string="https://reqres.in/api/users";
  constructor(private http:HttpClient ) { }
  getAll():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getListadeDocumentos(){
    return  new Promise (resolve=>{

      fetch('https://reqres.in/api/users')
      .then(resp=>resp.json())
      .then(body=>resolve(body.data));
    });

  }


}
