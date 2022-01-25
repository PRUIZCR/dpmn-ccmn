import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable()
export class CargarCombos {

    constructor(private http: HttpClient) { }
    returnedData: any;
    /*Obtiene los tipo de Control*/
    getTipoDocumento(url: string) {

        

        return this.http
            .get<any>(url).subscribe((data) => {
                this.returnedData = data;
            }, error => {
                console.log({ error });
            })
    }
}