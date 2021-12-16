import { Component,Input,OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ParamMap,Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Table } from 'primeng/table';
import { ActivatedRoute, Params } from '@angular/router';
import { DocumentodescargaService } from 'src/app/services/documentodescarga.service';
import { DocumentoDpmn } from 'src/app/model/domain/DocumentoDpmn';
import { RowTblCompago } from 'src/app/model/domain/row-tbl-compago.model';
import { saveAs } from 'file-saver';
import { ComprobantePago } from 'src/app/model/domain/comprobante-pago.model';
import { DocumentoAdjuntoDpmn } from 'src/app/model/domain/adjunto-dpmn.model';
import { DocumentoDescarga } from 'src/app/model/domain/DocumentoDescarga';
import { environment } from 'src/environments/environment';
import { ConstantesApp } from 'src/app/utils/constantes-app';
import { SerieDeclaracionDpmn } from 'src/app/model/domain/serie-declaracion';
import { TokenAccesoService } from '../../services/token-acceso.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls:['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  [x: string]: any;

  private URL_RESOURCE_DATOS_DECLARACION : string = environment.urlBase + ConstantesApp.RESOURCE_DATOS_DECLARACION;
  private URL_RESOURCE_ARCHIVOS_ADJUNTOS : string = environment.urlBase + ConstantesApp.RESOURCE_ARCHIVOS_ADJUNTOS;

  private URL_RESOURCE_DATOS_DECLARACION_CCMN : string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_DATOS_DECLARACION_CCMN;
  private URL_RESOURCE_ARCHIVOS_ADJUNTOS_CCMN : string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_ARCHIVOS_ADJUNTOS_CCMN;


  aduanaDescarga:string;
  puestoControlDescarga:string;
  nombredeEmpresa: string;
  paisEmpresa:string;
  tipoNacionalidad: string;
  tipoIdentificacion:string;
  desIdentificacion:string;
  nomEmpresa:string;
  flujoVehiculo:string;
  paisPlaca:string;
  nomPlaca:string;
  paisplacaCarreta:string;
  nomPlacaCarreta:string;
  valEmail:string;
  numTelefono:string;

  nacionalidad:string;
  tipoDocumentoConductor:string;
  numDocIdentidad:string;
  nomConductor:string;
  apeConductor:string;
  numLicencia:string;

  desObservacion:string;
  ubigeoOrigen:string;

  documentosDpmn: DocumentoDpmn;
  datosAdjuntosNum:string|null;
  tipDocumDetalles:string|null;
  
  comprobantes: ComprobantePago[]= new Array();
  documentosAdjuntos: DocumentoAdjuntoDpmn[]= new Array();
  seriesDeclaracionDpmn: SerieDeclaracionDpmn[]= new Array();
  documentos: DocumentoDescarga[]= new Array();
  loading: boolean = true;
  respuestaData: any;
  rowsTblComprobante : RowTblCompago[] = new Array();
  urlConsultaDetalleTitulo="";
  localEmpresaTransporte = [];
  constructor(private documentodescargaService:DocumentodescargaService,
    private router:Router,private http: HttpClient,
    private rutaActiva: ActivatedRoute,private fb: FormBuilder,
    private tokenAccesoService: TokenAccesoService){
  }

  @Input() tipoDocumentoform:string;
  numeroCorrelativoDetalle:string|null;
  tipDocumDetalle:string|null;
  ngOnInit() {
    this.tipoOrigen = this.tokenAccesoService.origen;
   this.numeroCorrelativoDetalle=this.rutaActiva.snapshot.paramMap.get('numCorrelativo');
   this.numeroTipoDocum=this.rutaActiva.snapshot.paramMap.get('tipoDocum');
   if(this.numeroTipoDocum=="1"){
     this.urlConsultaDetalleTitulo="CCMN";
    }else{
      this.urlConsultaDetalleTitulo="DPMN";
    }

           console.log('llego del activated route numeroCorrelativoDetalle :' + this.numeroCorrelativoDetalle);

     this.numeroDeDocumentoDescarga=sessionStorage.getItem("numeroDeDocumentoDescarga");
            // var numCorrelativoOk= sessionStorage.getItem("numCorrelativo")?sessionStorage.getItem("numCorrelativo"):"";
            console.log('numeroCorrelativoDetalle s :' + this.numeroCorrelativoDetalle);
            console.log('llego del activated route :' + this.numeroTipoDocum);
     this.getListadeDocumentos(this.numeroCorrelativoDetalle,this.numeroTipoDocum); 
    
      /*******************inicio adjunto *******************/
      if(this.numeroTipoDocum=="1"){
          this.documentodescargaService.getDocumentoAdjuntoByNumcorredocCcmn(this.numeroCorrelativoDetalle)
          .toPromise()
          .then((resp:any)=><DocumentoAdjuntoDpmn[]>resp)
          .then(data=>{console.log('documento data adjunta[0]',data);
          return data;})
          .then(documentosAdj=>{
            this.documentosAdjuntos=documentosAdj;
            this.loading = false;
            this.documentos.forEach(
              documentos=>(documentos.placaCarreta=documentos.placaCarreta)
              );
            })
      }else{
        this.documentodescargaService.getDocumentoAdjuntoByNumcorredoc(this.numeroCorrelativoDetalle)
        .toPromise()
        .then((resp:any)=><DocumentoAdjuntoDpmn[]>resp)
              .then(data=>{console.log('documento data adjunta[0]',data);
        return data;})
        .then(documentosAdj=>{
          this.documentosAdjuntos=documentosAdj;
          this.loading = false;
          this.documentos.forEach(
            documentos=>(documentos.placaCarreta=documentos.placaCarreta)
            );
          })
      }
     /*******************adjunto fin *******************/
    
     /*******************inicio serie declaracion *******************/

     if(this.numeroTipoDocum=="1"){
      this.urlConsultaDetalleTitulo="CCMN";
      this.documentodescargaService.getSeriesDeclaracionByNumcorredocCCMN(this.numeroCorrelativoDetalle)
      .toPromise()
      .then((resp:any)=><SerieDeclaracionDpmn[]>resp)
      .then(data=>{
      return data;})
      .then(serieDeclaracionDpmns=>{
        this.seriesDeclaracionDpmn=serieDeclaracionDpmns;
        this.loading = false;
        this.seriesDeclaracionDpmn.forEach(
          (documentos: any)=>{
            documentos.dam = documentos.aduanaDam.codDatacat + "-" + documentos.annDam + "-" + documentos.regimenDam.codDatacat + "-" + ('000000' + documentos.numDam).slice(-6) ;
            documentos.indEliminado=documentos.indEliminado;
          }
          );
        })
     }else{
       this.urlConsultaDetalleTitulo="DPMN";
       this.documentodescargaService.getSeriesDeclaracionByNumcorredoc(this.numeroCorrelativoDetalle)
       .toPromise()
       .then((resp:any)=><SerieDeclaracionDpmn[]>resp)
       .then(data=>{
       return data;})
       .then(serieDeclaracionDpmns=>{
         this.seriesDeclaracionDpmn=serieDeclaracionDpmns;
         this.loading = false;
         this.seriesDeclaracionDpmn.forEach(
          (documentos: any)=>{
            documentos.dam = documentos.aduanaDam.codDatacat + "-" + documentos.annDam + "-" + documentos.regimenDam.codDatacat + "-" + ('000000' + documentos.numDam).slice(-6) ;
            documentos.indEliminado=documentos.indEliminado;
           }
           );
         })
     }
   /*******************fin serie declaracion *******************/
   

  }

   getListadeDocumentos(numCorrelativoOk:string | null,numeroTipoDocum:string | null) { ///{correlativodpmn}/adjuntosdpmn{correlativodpmn}
    var urlConsultaDetalle=this.URL_RESOURCE_DATOS_DECLARACION;
    const params=new HttpParams().set('anulado',true);
    if(numeroTipoDocum=="1"){
         urlConsultaDetalle=this.URL_RESOURCE_DATOS_DECLARACION_CCMN;
    }else{
       urlConsultaDetalle=this.URL_RESOURCE_DATOS_DECLARACION;
  }
      console.log('url detalle: ' +urlConsultaDetalle)
    return this.http.get<DocumentoDpmn>(urlConsultaDetalle+numCorrelativoOk,{params}) 
    .subscribe(async data=>{ console.log('documento data detalle[0]'+this.documentosDpmn ),this.documentosDpmn=data

      this.cargandoEmpresaTransporte(data);
      this.cargandoconductor(data);   
      this.cargandoDatosComplementario(data);   
      this.cargandoDatosComprobante(data); 
    });
  }
  cargandoEmpresaTransporte(data: DocumentoDpmn){
    this.aduanaDescarga=data.aduanaDescarga.codDatacat + ' - '+data.aduanaDescarga.desDataCat;
    this.puestoControlDescarga=data.puestoControlDescarga.codDatacat + ' - '+data.puestoControlDescarga.desDataCat;
    this.tipoNacionalidad=data.empresaTransporte.tipoNacionalidad.desDataCat;
    this.paisEmpresa=data.empresaTransporte.paisEmpresa.desDataCat;
    this.tipoIdentificacion=data.empresaTransporte.tipoDocIdentidad.codDatacat + ' - '+ data.empresaTransporte.tipoDocIdentidad.desDataCat;
    this.desIdentificacion=data.empresaTransporte.numDocIdentidad;
    this.nomEmpresa=data.empresaTransporte.nomEmpresa;
    this.flujoVehiculo=data.empresaTransporte.flujoVehiculo.codDatacat.toString() + ' - '+data.empresaTransporte.flujoVehiculo.desDataCat;
    this.paisPlaca=data.empresaTransporte.paisPlaca.codDatacat + ' - '+ data.empresaTransporte.paisPlaca.desDataCat;
    this.nomPlaca=data.empresaTransporte.nomPlaca;
    let errorPPC = data.empresaTransporte.paisPlacaCarreta;
    if (errorPPC != null) {
        this.paisplacaCarreta=data.empresaTransporte.paisPlacaCarreta.codDatacat+ ' - '+ data.empresaTransporte.paisPlacaCarreta.desDataCat;
      }
    let errornPC = data.empresaTransporte.nomPlacaCarreta;
    if (errorPPC != null) {
      this.nomPlacaCarreta=data.empresaTransporte.nomPlacaCarreta;
    }

    this.valEmail=data.empresaTransporte.valEmail;
    this.numTelefono=data.empresaTransporte.numTelefono;
    console.log(this.data);
 
  }

  cargandoconductor(data: DocumentoDpmn){
    this.nacionalidad=data.conductor.pais.codDatacat+' - '+ data.conductor.pais.desDataCat;
    this.tipoDocumentoConductor=data.conductor.tipoDocIdentidad.codDatacat+' - '+data.conductor.tipoDocIdentidad.desDataCat;
    this.numDocIdentidad=data.conductor.numDocIdentidad;
    this.nomConductor=data.conductor.nomConductor;
    this.apeConductor=data.conductor.apeConductor;
    this.numLicencia=data.conductor.numLicencia;
  }

  cargandoDatosComplementario(data: DocumentoDpmn){
      this.desObservacion=data.datoComplementario.desObservacion;
      this.ubigeoOrigen=data.datoComplementario.ubigeoOrigen.codUbigeo+' - '+data.datoComplementario.ubigeoOrigen.nomDepartamento+' - '+
                        data.datoComplementario.ubigeoOrigen.nomProvincia+' - '+data.datoComplementario.ubigeoOrigen.nomDistrito;
  }
  cargandoDatosComprobante(data: DocumentoDpmn){
    this.comprobantes=data.comprobantePago;
    //const result = this.comprobantes.find( ({ indEliminado }) => indEliminado === true );
    //console.log("los comprobantes no eliminados son:" + result);
  }

  cargandodatosAdjuntos(numCorrelativoOk:string | null){
   this.datosAdjuntosNum=numCorrelativoOk;
   this.documentos = new Array();
   this.documentodescargaService.getDocumentoAdjuntoByNumcorredoc(numCorrelativoOk)
   .toPromise()
     .then((resp:any)=><DocumentoAdjuntoDpmn[]>resp)
     .then(data=>{console.log('documento data adjunta[0]',data);
     return data;})
     
  }

  clear(table: Table) {
    table.clear();
  } 

  downloadPDFExcel(idECM: string,nomArch:string): void{
    console.log('codArchivoEcm: '+ idECM);
    this.http.get(this.URL_RESOURCE_ARCHIVOS_ADJUNTOS+idECM,{responseType: 'blob'}) 
    .subscribe(Blob=>{ console.log('adjunto data adjun:'+Blob), saveAs(Blob, nomArch);
    }) ;
   
  }
  downloadPDFExcelCcmn(idECM: string,nomArch:string): void{
    console.log('codArchivoEcm: '+ idECM);
    this.http.get(this.URL_RESOURCE_ARCHIVOS_ADJUNTOS_CCMN+idECM,{responseType: 'blob'}) 
    .subscribe(Blob=>{ console.log('adjunto data adjun:'+Blob), saveAs(Blob, nomArch);
    }) ;
   
  }

  guiaCarta(data: ComprobantePago): string {
    let guiacarta = ' ';
    const tipoCom=data.tipoComprobante.codDatacat;
    const control = data.numRucRemitente;
    if (tipoCom== "02") {
      guiacarta =data.numCartaPorte;
      }else{
      guiacarta =data.numRucRemitente;
      }
    return guiacarta;
 }
 guiaCartaDesc(data: ComprobantePago): string {
  let guiacartadescri = ' ';
  const tipoCom=data.tipoComprobante.codDatacat;
    const control = data.numRucRemitente;
    if (tipoCom== "02") {
      guiacartadescri =data.numCartaPorte;
      }else{
        guiacartadescri =data.desRazonSocialRemitente;
      }
    return guiacartadescri;
}

retornar(){
  this.router.navigate(['/condpmn/lista', this.numeroTipoDocum])
}

}




