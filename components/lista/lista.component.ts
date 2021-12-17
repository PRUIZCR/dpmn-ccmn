import { Component, Input, OnInit, Output, ViewChild} from '@angular/core';

/** Constants used to fill up our data base. */
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { HttpClient } from '@angular/common/http';
import { DocumentodescargaService } from 'src/app/services/documentodescarga.service';
import 'rxjs/add/operator/toPromise';
import { DocumentoDescarga } from 'src/app/model/domain/DocumentoDescarga';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoAdjuntoDpmn } from 'src/app/model/domain/adjunto-dpmn.model';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common'
import { ConsultaDpmnService } from 'src/app/services/consulta.dpmn'
import { ConsultaCcmnService } from 'src/app/services/consulta.ccmn'
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda'
import { ConsultaCcmn } from 'src/app/model/bean/param-busquedaccmn'
import { DpmnResumen } from 'src/app/model/domain/dpmn-resumen';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MessageService]
})
export class ListaComponent implements OnInit {

  numCorrelativo: number = 0;

  jsonConsulta: ConsultaDpmn = new ConsultaDpmn;
  jsonConsultaCcmn: ConsultaCcmn = new ConsultaCcmn;

  @Output() valorsalida: EventEmitter<number> = new EventEmitter();
  @Input() tipDocum:string|null;

  @Input() tipoDocumentoform:string;

  respuestaData: any;
  loading = true;
  statuses: any[] = [];
  table!: Table;
  documentos: DocumentoDescarga[] = new Array();
  documentosAdjuntos: DocumentoAdjuntoDpmn[] = new Array();
  date: Date;

  revDocFisico:boolean;
  revDocDocumentario:boolean;
  tipoRevision: boolean;
  mostrarImagen:string;
  public lstDpmn: DpmnResumen[] = new Array();


  constructor(private router: Router,
    private http: HttpClient, private documentodescargaService: DocumentodescargaService,
    private rutaActiva: ActivatedRoute, public datepipe: DatePipe,
    private myService: ConsultaDpmnService, private myServiceCcmn: ConsultaCcmnService
  
  ) {
  }
  @ViewChild('dt') dt: Table | undefined;
  filterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'documentos.placaCarreta');
  }


 @ViewChild ('dt12 :') dt12: any;
  ngOnInit(): void {
      this.rutaActiva.paramMap.subscribe((parametros:ParamMap)=>{
        this.tipDocum=parametros.get("tipoDocumentoform");
      })
      console.log('llego del activated route :' + this.tipDocum);
    //var tipDocumDpCc= sessionStorage.getItem("tipoDocumento")?sessionStorage.getItem("tipoDocumento"):0;
    if(this.tipDocum=="1"){
      this.myServiceCcmn.rptCcmnResumen$.subscribe((data: any) => {
        this.lstDpmn = data;
        console.log(this.lstDpmn);
        //this.transform(data);

      });
    }else{
      this.myService.rptDpmnResumen$.subscribe((data: any) => {
        this.lstDpmn = data;
        console.log(this.lstDpmn);
        //this.transform(data);
      });
    }

    this.loading = false;
  }
  get(numCorrelativoOk: string | null) {
    this.http.get<any>('v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/' + 44444 + '/adjuntosdpmn')
      .subscribe(data => {
        this.documentosAdjuntos = data;
      });
  }

  getListadeDocumentos(numCorrelativoOk: string | null) { ///{correlativodpmn}/adjuntosdpmn{correlativodpmn}
    this.http.get<any>('/v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/' + 44444 + '/adjuntosdpmn')
      .subscribe(async data => {
        this.documentosAdjuntos = data; console.log('adjunto :' + JSON.stringify(data));
      });
  }



  onLoadServer(tipDocum: string|null,id2:number) {
      sessionStorage.setItem("numCorrelativo", tipDocum?tipDocum.toString():"");
    sessionStorage.setItem("numeroDeDocumentoDescarga", id2.toString());
      console.log( 'localstorage:  '+ sessionStorage.getItem("numCorrelativo"));
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.documentos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "documentos");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
       FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      //FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
    });
  }

  downloadPDFExcel(idECM: string): void {
    const doc = new jsPDF();

    this.http.get('/v1/controladuanero/prevencion/cuentacorrienteimpo/e/archivosadjuntodpmn/' + idECM, { responseType: 'blob' })
      .subscribe(async data => {
      });
  }
  myFunction() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }

  exportarpdf(nomArch: string) {
    this.documentos = new Array();
    this.myService.consultaJsonSession$.subscribe(datos => this.jsonConsulta = datos);
      this.documentodescargaService.getDocumentoDescargaPdf(nomArch, this.jsonConsulta,this.tipDocum);
  }

  exportarexcel(nomArch: string) {
    this.documentos = new Array();
    this.myService.consultaJsonSession$.subscribe(datos => this.jsonConsulta = datos);
      this.documentodescargaService.getDocumentoDescargaEXcel(nomArch, this.jsonConsulta,this.tipDocum);
  }

  valPlacaCarreta(data: DpmnResumen): string {
    let error = ' ';
    const control = data.paisPlacaCarreta;
    if (control != null) {
      error =control.codDatacat +'-'+data.placaCarreta;
      }
    return error;
 }
  reporteresumido(nomArch: string) {
    this.documentos = new Array();
   
  }
}

