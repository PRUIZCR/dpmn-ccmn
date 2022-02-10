 import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import {Router} from "@angular/router"
import { FormControl, FormGroup, FormBuilder, Validators,ReactiveFormsModule  } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { PrimeNGConfig, MessageService, Message } from 'primeng/api';
import { EmpresaTrans } from 'src/app/model/bean/empresaTrans.model';
import { Ruc } from 'src/app/model/bean/ruc.model';
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda'
import { DataCatalogo } from 'src/app/model/common/data-catalogo.model'
import { ConsultaDpmnService } from 'src/app/services/consulta.dpmn'
import { ConsultaCcmnService } from 'src/app/services/consulta.ccmn'
import {ListaComponent} from 'src/app/components/lista/lista.component' 
import { DpmnResumen } from 'src/app/model/domain/dpmn-resumen';
import { CcmnResumen } from 'src/app/model/domain/ccmn-resumen';
import { environment } from 'src/environments/environment';
import { ConstantesApp } from 'src/app/utils/constantes-app';
import { TokenAccesoService } from '../../services/token-acceso.service';
import { UbicacionFuncionarioService } from 'src/app/services/ubicacion-funcionario.service';
import { UbicacionFuncionario } from 'src/app/model/bean/ubicacion-funcionario';
import { Respuesta } from 'src/app/model/common/Respuesta';
import { Estado } from 'src/app/model/common/Estado';
import { PuestoControl } from 'src/app/model/bean/PuestoControl';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService, DatePipe, ListaComponent]
})
export class DashboardComponent implements OnInit {

  private RESOURCE_RUC: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_RUC;
  private RESOURCE_PUESTO_CONTROL: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_PUESTO_CONTROL;
  private RESOURCE_EMPRESA_TRANS: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_EMPRESA_TRANS;
  private URL_RESOURCE_EMPRESA_TRANS: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_EMPRESA_TRANS;
  private URL_RESOURCE_PUESTO_CONTROL_CCMN: string = environment.urlBaseIntranet+ConstantesApp.RESOURCE_PUESTO_CONTROL_CCMN;
  private URL_RESOURCE_EMPRESA_TRANS_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_EMPRESA_TRANS_CCMN;
  private URL_RESOURCE_RUC_CCMN: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_RUC_CCMN;
  private URL_RESOURCE_UBICACION_FUNCIONARIO: string = environment.urlBaseIntranet + ConstantesApp.RESOURCE_UBICACION_FUNCIONARIO; 
  loadingConsultar = false;
  consultaForm: FormGroup;
  lstTipoDocumento: any;
  lstTipoControl: any;
  lstPaisVehiculo: any;
  lstPaisVehiculoPuno: any;
  lstPaisVehiculoTacna: any;
  lstAduanaDocumento: any;
  lstAduanaDocumento2: any;
  lstPuestoControl: any;
  lstRegimen: any;
  lstEstados: any;
  lstEstadosccmn: any;
  date = new Date();
  maxLengthNumDoc: number = 11;
  esVisible: boolean = false;
  cantPuestoControl:number;
  esVisibleFuncAduan: boolean = true;
  aduanaFuncionario:string;
  aduanaFuncionarioLogueo:string;
  puestoControlFuncionarioLogueo:string;
  puestoControlFuncionario:string
  msgs: Message[] = [];
  numeroRUC : string;
  tipoOrigen:string;
  nroRegistro:string;
  tipo:number;
  @Input () tipoDocumentoform: string;
  @ViewChild('tipoDocDpmnCcmn') tipoDocDpmnCcmn:ElementRef<HTMLInputElement>;
  @ViewChild(ListaComponent) lista!:ListaComponent;
  rptaPuestoControl : Respuesta<PuestoControl[]>;
  catalogoAduanasDescarga: DataCatalogo[] = new Array();
  ubicacionFuncionario: UbicacionFuncionario;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private consultaDpmnService: ConsultaDpmnService,
    private consultaCcmnService: ConsultaCcmnService,
    private router: Router,
    private tokenAccesoService: TokenAccesoService,
    private datePipe: DatePipe,
    private ubicacionFuncionarioService: UbicacionFuncionarioService,
    ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getCatalogo('assets/json/tipoDocumento.json', 1);
    this.getCatalogo('assets/json/tipoControl.json', 2);
    this.getCatalogo('assets/json/paisPlaca.json', 3);
    this.getCatalogo('assets/json/aduanas.json', 4);
    this.getCatalogo('assets/json/regimen.json', 5);
    this.getCatalogo('assets/json/estadosccmn.json', 7)
    this.getCatalogo('assets/json/aduanas262.json', 8)
    this.getCatalogo('assets/json/paisPlacaPuno.json', 9);
    this.getCatalogo('assets/json/paisPlacaTacna.json', 10);

    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]
    });

    this.tipoDocumentoform="1";
    if(this.esVisibleFuncAduan){
      this.esVisible = true;
    }else{
      this.esVisible=false;
    }
  }

  private buildForm() {
    this.numeroRUC = this.tokenAccesoService.numeroRUC;
    this.tipoOrigen = this.tokenAccesoService.origen;
    this.nroRegistro = this.tokenAccesoService.nroRegistro;
    this.limpiar();
    this.consultaForm.controls.numeroRucEmprTrans.setValue(this.numeroRUC);
    this.buscarRUC('1');
    this.cargarAduanaFuncionario(this.nroRegistro);
    
    this.consultaForm.controls.codAduanaDocumento.setValue(this.aduanaFuncionario);
    this.consultaForm.controls.codAduanaDAM.setValue(this.aduanaFuncionario);
  }

  async consultar() {
    this.loadingConsultar = true;
    var tipo = this.consultaForm.controls.tipoBusqueda.value;

    if (this.consultaForm.invalid) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Por favor seleccione uno de los criterios a consultar' });
      this.loadingConsultar = false;
      return;
    }

    if (tipo == 1) {
      if (!this.cumpleValidacionPorNumeroDocumento()){
        this.loadingConsultar = false;
        return;
      }
    } else if (tipo == 2) {
      if (!this.cumpleValidacionPorDAM()){
        this.loadingConsultar = false;
        return;
      }
    } else {
      if (!this.cumpleValidacionPorFecha()){
        this.loadingConsultar = false;
        return;
      }
    }

    /*Esta parte se comenta para que permita la consulta de la CCMN*/ 
    
    /*if(this.consultaForm.controls.tipoDocumento.value == 1){
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'La consulta por CCMN no se encuentra habilitada' });
      this.loadingConsultar = false;
      return;
    }*/

    let paramConsulta = new ConsultaDpmn();
    paramConsulta.codigoTransportista = this.consultaForm.controls.codEmprTrans.value;
    paramConsulta.rucTransportista = this.consultaForm.controls.numeroRucEmprTrans.value;
    paramConsulta.razonSocialTransportista = this.consultaForm.controls.descRazonSocialEmprTrans.value;
    paramConsulta.tipoDocumentoDescarga = this.generaDataCatalogo(this.consultaForm.controls.tipoDocumento.value);
    paramConsulta.estadoDelDocumentoDeDescarga = this.generaDataCatalogo(this.consultaForm.controls.estado.value);
    paramConsulta.tipoDeControl = this.generaDataCatalogo(this.consultaForm.controls.tipoControl.value)
    paramConsulta.paisPlacaDelVehiculo = this.generaDataCatalogo(this.consultaForm.controls.codPaisPlaca.value);
    paramConsulta.placaDelVehiculo = this.consultaForm.controls.numPlaca.value;
    paramConsulta.indicadorPorDocumento = this.consultaForm.controls.tipoBusqueda.value=='1'?true:false;
    paramConsulta.numeroDeDescarga = this.consultaForm.controls.numeroDocumento.value;
    paramConsulta.aduanaDeDescarga = this.generaDataCatalogo(this.consultaForm.controls.codAduanaDocumento.value);
    paramConsulta.puestoDeControlDescarga = this.generaDataCatalogo(this.consultaForm.controls.codPuestoControl.value);
    paramConsulta.anoDeDescarga = this.consultaForm.controls.anoDocumento.value;
    paramConsulta.rucDelRemitente = this.consultaForm.controls.numeroRucRemitente.value;
    paramConsulta.razonSocialDelRemitente = this.consultaForm.controls.descRazonSocialRemitente.value;
    paramConsulta.indicadorPorDeclaracion = this.consultaForm.controls.tipoBusqueda.value=='2'?true:false;
    paramConsulta.aduanaDeDeclaracion = this.generaDataCatalogo(this.consultaForm.controls.codAduanaDAM.value);
    paramConsulta.anoDeDeclaracion = this.consultaForm.controls.anoDAM.value;
    paramConsulta.regimenDeDeclaracion = this.generaDataCatalogo(this.consultaForm.controls.codRegimen.value);
    paramConsulta.numeroDeDeclaracion = this.consultaForm.controls.numeroDAM.value;
    paramConsulta.indicadorPorFecha = this.consultaForm.controls.tipoBusqueda.value=='3'?true:false;
    if(this.tokenAccesoService.origen=="IA"){
      paramConsulta.indicadorConsultaFuncionario=true;  
    }else{
      paramConsulta.indicadorConsultaFuncionario=false;  
    }
    paramConsulta.codAduanaFuncionario=this.aduanaFuncionario;
    if(this.aduanaFuncionario=="262"){
      paramConsulta.codAduanaFuncionario="181";
    }

    var fechaInicio = this.datePipe.transform(this.consultaForm.controls.fechaInicio.value,"dd/MM/yyyy") as string;
    var fechaFin = this.datePipe.transform(this.consultaForm.controls.fechaFin.value,"dd/MM/yyyy") as string;
    paramConsulta.fechaDeInicioConsulta = fechaInicio;
    paramConsulta.fechaFinConsulta = fechaFin;

    this.tipoDocumentoform=this.consultaForm.controls.tipoDocumento.value;
    console.log('El valor es: '+ this.tipoDocumentoform + ' dashboard');
      //this.lista.tipDocum=this.tipoDocumentoform;
     // console.log('El valor es tipDocum: '+ this.lista.tipDocum );

    if(this.consultaForm.controls.tipoDocumento.value == 1){
      /* this.messageService.add({ key: 'msj', severity: 'warn', detail: 'La consulta por CCMN no se encuentra habilitada' });
      this.loadingConsultar = false;
      return;*/
      await this.consultaCcmnService.buscarCcmns(paramConsulta);
      this.messageService.clear;

      this.consultaCcmnService.rptCcmnResumen$.subscribe((resultado : CcmnResumen[]) => {
        var cumpleValidacion = false;
        resultado.forEach(ccmn=>{
          if(ccmn.msg!=null || ccmn.msg!=undefined){
            cumpleValidacion = false;
            this.messageService.add({ key: 'msj', severity: 'warn', detail: ccmn.msg });
            this.loadingConsultar = false;
            return;
          }else{
            cumpleValidacion = true;
          }
        })
  
        if(cumpleValidacion){
          this.router.navigate(['/condpmn/lista', this.tipoDocumentoform])
          this.enviar(this.tipoDocumentoform);
        }
      });
    }else{
    await this.consultaDpmnService.buscarDpmns(paramConsulta);
    this.messageService.clear;

    this.consultaDpmnService.rptDpmnResumen$.subscribe((resultado : DpmnResumen[]) => {
      var cumpleValidacion = false;
      resultado.forEach(dpmn=>{
        if(dpmn.msg!=null || dpmn.msg!=undefined){
          cumpleValidacion = false;
          this.messageService.add({ key: 'msj', severity: 'warn', detail: dpmn.msg });
          this.loadingConsultar = false;
          return;
        }else{
          cumpleValidacion = true;
        }
      })

      if(cumpleValidacion){
          this.router.navigate(['/condpmn/lista', this.tipoDocumentoform])
          this.enviar(this.tipoDocumentoform);
      }
    });
    }

    this.loadingConsultar = false;
  }

  generaDataCatalogo(valor: string): any {
    let datacatalogo = new DataCatalogo();
    datacatalogo.codDatacat = valor;
    return datacatalogo;
  }

  cumpleValidacionPorNumeroDocumento(): any {
    var aduana = this.consultaForm.controls.codAduanaDocumento.value;
    var tipoDocumento = this.consultaForm.controls.tipoDocumento.value;
    var puestoControl = this.consultaForm.controls.codPuestoControl.value;
    var anio = this.consultaForm.controls.anoDocumento.value;
    var numero = this.consultaForm.controls.numeroDocumento.value;

    if (aduana == '' || anio == '' || numero == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Para consultar por Documento debe ingresar la aduana, año y número' });
      return false;
    }

    if (tipoDocumento == '1' && puestoControl == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe seleccionar el Puesto de Control' });
      return false;
    }

    return true;
  }

  cumpleValidacionPorDAM(): any {
    var aduana = this.consultaForm.controls.codAduanaDAM.value;
    var anio = this.consultaForm.controls.anoDAM.value;
    var regimen = this.consultaForm.controls.codRegimen.value;
    var numero = this.consultaForm.controls.numeroDAM.value;

    if (aduana == '' || anio == '' || regimen == '' || numero == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Para consultar por Declaración debe ingresar la aduana, año, régimen y número' });
      return false;
    }

    return true;
  }

  cumpleValidacionPorFecha(): any {
    var fechaInicio = this.consultaForm.controls.fechaInicio.value;
    var fechaFin = this.consultaForm.controls.fechaFin.value;

    if (fechaInicio == null || fechaFin == null) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Para consultar por Fecha de registro debe ingresar fecha de inicio y fin' });
      return false;
    }

    if (fechaInicio > fechaFin) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'La fecha de inicio no puede ser mayor a la fecha fin' });
      return false;
    }

    return true;
  }
  onRadioChange() {
    var tipoRadio = this.consultaForm.controls.tipoBusqueda.value;
    if (tipoRadio == 1) {
      this.enabledDocumento();
    } else if (tipoRadio == 2) {
      this.enabledDAM();
    } else if (tipoRadio == 3) {
      this.enabledFechas();
    }
  }

  onChangeTipoDoc() {
     this.tipoDocumentoform = this.consultaForm.controls.tipoDocumento.value;
    console.log('tipo: ' + this.tipoDocumentoform);
    if (this.tipoDocumentoform == "1") {
      this.maxLengthNumDoc = 10;
      this.esVisible = true;

      this.consultaForm.controls.numeroDocumento.setValue('');
      this.getCatalogo('assets/json/estadosccmn.json', 7);
    } else {
      this.maxLengthNumDoc = 6;
      this.esVisible = false;
 
      this.consultaForm.controls.numeroDocumento.setValue('');
      this.getCatalogo('assets/json/estados.json', 6);
    }
    //this.enviar(this.tipoDocumentoform);
    }
  enviar(tipo:any){
    sessionStorage.setItem("tipoDocumento", tipo);
  }

  validarPlaca() {
    var placa = this.consultaForm.controls.numPlaca.value;
    var regexp = new RegExp('^[A-Z0-9]{5,8}$');
    if (placa.length == 0)
      return;

    if (!regexp.test(placa)) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Placa de vehículo debe tener entre 5 y 8 caracteres' });
      //this.consultaForm.controls.numPlaca.setValue('');
    }
  }

  validarAnioDocumento(){
    if(this.consultaForm.controls.anoDocumento.value > this.date.getFullYear()){
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Año del documento no debe ser mayor a año actual' });
      this.consultaForm.controls.anoDocumento.setValue('');
    }
  }

  validarAnioDeclaracion(){
    if(this.consultaForm.controls.anoDAM.value > this.date.getFullYear()){
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Año de la declaración no debe ser mayor a año actual' });
      this.consultaForm.controls.anoDAM.setValue('');
    }
  }

  /*Carga los puesto de control por aduana seleccionada*/
  cargarPuestoControl(aduanaFuncionario:string) {
    var aduana = this.consultaForm.controls.codAduanaDocumento.value;
    var codPuestoControlAdu = this.consultaForm.controls.codPuestoControl.value;

    this.http
      .get<any>(this.URL_RESOURCE_PUESTO_CONTROL_CCMN + aduana).subscribe((res: any) => {
        this.lstPuestoControl = res;
        console.log(this.lstPuestoControl);
        let datCatPtoControl : PuestoControl = new PuestoControl();

        let busqPuesto = this.lstPuestoControl.filter((pto: { codigo: any; }) => pto.codigo== codPuestoControlAdu );
        this.cantPuestoControl=busqPuesto.length;
        if(busqPuesto==0){
          this.consultaForm.controls.codPuestoControl.setValue('');
        }else{
          this.consultaForm.controls.codPuestoControl.setValue(codPuestoControlAdu);
        }

        if(aduana=="019"){
           datCatPtoControl.codigo = "0205";
           datCatPtoControl.descripcion = "CEBAF Eje Vial 1";
           this.lstPuestoControl.push(datCatPtoControl);
        }else if(aduana=="181"){
          datCatPtoControl.codigo = "0203";
           datCatPtoControl.descripcion = "CEBAF Desaguadero";
           this.lstPuestoControl.push(datCatPtoControl);
        }else if(aduana=="172"){
          datCatPtoControl.codigo = "0204";
           datCatPtoControl.descripcion = "CAF Santa Rosa";
           this.lstPuestoControl.push(datCatPtoControl);
        }
      }, error => {
        console.log({ error });
      })
      this.consultaForm.controls.codAduanaDAM.setValue(this.aduanaFuncionarioLogueo);
  }
  cargarAduanaPuno(aduanaFuncionario:string){
      if(this.aduanaFuncionario=="181" ){
        //this.aduanaFuncionario="262";
        this.consultaForm.controls.codAduanaDAM.setValue('262');
        this.consultaForm.controls.codAduanaDocumento.setValue('181');
      }else{
        this.aduanaFuncionario=aduanaFuncionario;
      }
  }
    cargarAduanaFuncionario(nroRegistro:string){
      //this.ubicacionFuncionarioService.buscar(nroRegistro).subscribe( (ubicacion: UbicacionFuncionario) => {
      //this.cargarControlesPaso(ubicacion.puestoControl);
      this.http.get<UbicacionFuncionario>(this.URL_RESOURCE_UBICACION_FUNCIONARIO + nroRegistro).subscribe((ubicacion: UbicacionFuncionario)=>{
      this.ubicacionFuncionario = ubicacion;
      let arrPuestosControl : PuestoControl[] = new Array();
      let datCatPtoControl : PuestoControl = new PuestoControl();

      datCatPtoControl.codigo = ubicacion?.puestoControl?.codigo;
      datCatPtoControl.descripcion = ubicacion?.puestoControl?.descripcion;

      arrPuestosControl.push(datCatPtoControl);
      if(this.aduanaFuncionario== undefined || this.aduanaFuncionario==null || this.aduanaFuncionario.length == 0 ){
        this.aduanaFuncionarioLogueo=ubicacion?.puestoControl?.aduana?.codigo;
        console.log('aduanaFuncionarioLogueo:' +this.aduanaFuncionarioLogueo);
        this.puestoControlFuncionarioLogueo=datCatPtoControl.codigo;
       }
      this.rptaPuestoControl = Respuesta.create(arrPuestosControl, Estado.SUCCESS);
      let datCatAduanaDescarga : DataCatalogo = new DataCatalogo();
      if ( this.catalogoAduanasDescarga.length <= 0 ) { 
        datCatAduanaDescarga.codDatacat = ubicacion?.puestoControl?.aduana?.codigo;
        datCatAduanaDescarga.desDataCat = ubicacion?.puestoControl?.aduana?.descripcion;
        this.catalogoAduanasDescarga.push(datCatAduanaDescarga);
      }
       this.aduanaFuncionario=datCatAduanaDescarga.codDatacat;
       this.puestoControlFuncionario=datCatPtoControl.codigo;
       this.consultaForm.controls.codAduanaDocumento.setValue(this.aduanaFuncionario);
      console.log('ha ocurrido un error:' + datCatAduanaDescarga.codDatacat);
    }, () => {
      console.log('ha ocurrido un error cargarAduanaFuncionario');
    });
    }
    
  /*Obtiene los valores a cargar en los dropdown*/
 getCatalogo(url: string, tipojson: number) {
    return this.http
      .get<any>(url).subscribe((data) => {
      if (tipojson == 1) {
          this.lstTipoDocumento = data;
      } else if (tipojson == 2) {
          this.lstTipoControl = data;
      } else if (tipojson == 3) {
          this.lstPaisVehiculo = data;
      } else if (tipojson == 4) {
          this.lstAduanaDocumento = data;
      } else if (tipojson == 5) {
          this.lstRegimen = data;
      } else if(tipojson == 6) {
          this.lstEstados = data;
      } else if(tipojson == 7) {
        this.lstEstados = data;
      } else if (tipojson == 8) {
        this.lstAduanaDocumento2 = data;
      }else if (tipojson == 9) {
        this.lstPaisVehiculoPuno = data;
      }else if (tipojson == 10) {
        this.lstPaisVehiculoTacna = data;
        }
      }, error => {
        console.log({ error });
      })
  }

  /*Obtiene el nombre por Codigo de Empresa*/
  buscarEmprTrans() {
    var regexp = new RegExp('^[0-9]{4,6}$');
    var codEmpresa = this.consultaForm.controls.codEmprTrans.value;
    this.consultaForm.controls.numeroRucEmprTrans.disable();
    if (codEmpresa.length == 0)
      return;

    if (!regexp.test(codEmpresa)) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Ingrese correctamente el código de empresa' });
      this.consultaForm.controls.codEmprTrans.setValue('');
      this.consultaForm.controls.numeroRucEmprTrans.setValue('');
      this.consultaForm.controls.numeroRucEmprTrans.disable();
      return;
    }

    this.http
      .get<EmpresaTrans>(this.URL_RESOURCE_EMPRESA_TRANS + codEmpresa).subscribe((res: EmpresaTrans) => {
        this.consultaForm.controls.descRazonSocialEmprTrans.setValue(res.dnombre);
        this.consultaForm.controls.numeroRucEmprTrans.setValue('');
        this.consultaForm.controls.numeroRucEmprTrans.disable();
      }, error => {
        console.log({ error });
        this.messageService.add({ key: 'msj', severity: 'warn', detail: 'El código de empresa no existe' });
        this.consultaForm.controls.numeroRucEmprTrans.enable();
        this.consultaForm.controls.codEmprTrans.setValue('');
        this.consultaForm.controls.numeroRucEmprTrans.setValue('');
        this.consultaForm.controls.descRazonSocialEmprTrans.setValue('');
        this.consultaForm.controls.numeroRucEmprTrans.enable();
      })
  }

  /*Obtiene la razon social por RUC*/
  buscarRUCIntranet(tipo: string) {
    this.consultaForm.controls.codEmprTrans.disable();
    var ruc = '';
    if (tipo == '1') {
      ruc = this.consultaForm.controls.numeroRucEmprTrans.value;
    } else {
      ruc = this.consultaForm.controls.numeroRucRemitente.value;
    }

    var regexp = new RegExp('^[0-9]{11}$');

    if (ruc== undefined || ruc==null || ruc.length == 0){
      this.consultaForm.controls.numeroRucEmprTrans.setValue('');
      this.consultaForm.controls.numeroRucEmprTrans.enable();
      this.consultaForm.controls.codEmprTrans.enable();
      return;
    }
    if (!regexp.test(ruc)) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'El número de RUC debe tener 11 dígitos' });
      if (tipo == '1') {
        this.consultaForm.controls.numeroRucEmprTrans.setValue('');
        this.consultaForm.controls.codEmprTrans.enable();
      } else {
        this.consultaForm.controls.numeroRucRemitente.setValue('');
       this.consultaForm.controls.codEmprTrans.enable();
      }
      return;
    }

    this.http
      .get<Ruc>(this.RESOURCE_RUC + ruc).subscribe((res: Ruc) => {
        if (tipo == '1') {
          this.consultaForm.controls.descRazonSocialEmprTrans.setValue(res.razonSocial);
          this.consultaForm.controls.codEmprTrans.disable();
        } else {
          this.consultaForm.controls.descRazonSocialRemitente.setValue(res.razonSocial);
          this.consultaForm.controls.codEmprTrans.disable();
        }
      }, error => {
        console.log({ error });
        var msjError = "";
        if (tipo == '1') {
          msjError = "RUC de la Empresa de Transporte no existe";
          this.consultaForm.controls.numeroRucEmprTrans.setValue('');
          this.consultaForm.controls.descRazonSocialEmprTrans.setValue('');
          this.consultaForm.controls.codEmprTrans.enable();
        } else {
          msjError = "RUC del remitente no existe";
          this.consultaForm.controls.numeroRucRemitente.setValue('');
          this.consultaForm.controls.descRazonSocialRemitente.setValue('');
          this.consultaForm.controls.codEmprTrans.enable();
        }
        this.messageService.add({ key: 'msj', severity: 'warn', detail: msjError });
      })
  }
/*Obtiene la razon social por RUC*/
buscarRUC(tipo: string) {
  var ruc = '';
  if (tipo == '1') {
    ruc = this.consultaForm.controls.numeroRucEmprTrans.value;
  } else {
    ruc = this.consultaForm.controls.numeroRucRemitente.value;
  }

  var regexp = new RegExp('^[0-9]{11}$');

  if (ruc== undefined || ruc==null || ruc.length == 0)
    return;

  if (!regexp.test(ruc)) {
    this.messageService.add({ key: 'msj', severity: 'warn', detail: 'El número de RUC debe tener 11 dígitos' });
    if (tipo == '1') {
      this.consultaForm.controls.numeroRucEmprTrans.setValue('');
    } else {
      this.consultaForm.controls.numeroRucRemitente.setValue('');
    }
    return;
  }

  this.http
    .get<Ruc>(this.RESOURCE_RUC + ruc).subscribe((res: Ruc) => {
      if (tipo == '1') {
        this.consultaForm.controls.descRazonSocialEmprTrans.setValue(res.razonSocial);
      } else {
        this.consultaForm.controls.descRazonSocialRemitente.setValue(res.razonSocial);
      }
    }, error => {
      console.log({ error });
      var msjError = "";
      if (tipo == '1') {
        msjError = "RUC de la Empresa de Transporte no existe";
        this.consultaForm.controls.numeroRucEmprTrans.setValue('');
        this.consultaForm.controls.descRazonSocialEmprTrans.setValue('');
      } else {
        msjError = "RUC del remitente no existe";
        this.consultaForm.controls.numeroRucRemitente.setValue('');
        this.consultaForm.controls.descRazonSocialRemitente.setValue('');
      }
      this.messageService.add({ key: 'msj', severity: 'warn', detail: msjError });
    })
}
  enabledDocumento() {
    this.consultaForm.controls.codAduanaDocumento.enable();
    this.consultaForm.controls.codPuestoControl.enable();
    this.consultaForm.controls.anoDocumento.enable();
    this.consultaForm.controls.numeroDocumento.enable();
    this.consultaForm.controls.codAduanaDAM.disable();
    this.consultaForm.controls.anoDAM.disable();
    this.consultaForm.controls.codRegimen.disable();
    this.consultaForm.controls.numeroDAM.disable();
    this.consultaForm.controls.fechaInicio.disable();
    this.consultaForm.controls.fechaFin.disable();
    //this.cargarAduanaFuncionario(this.nroRegistro);
    if(this.aduanaFuncionario=="262"){
    this.consultaForm.controls.codAduanaDAM.setValue(this.aduanaFuncionarioLogueo);
    }

    this.cargarPuestoControl(this.aduanaFuncionario);
  }

  enabledDAM() {
    this.consultaForm.controls.codAduanaDAM.enable();
    this.consultaForm.controls.anoDAM.enable();
    this.consultaForm.controls.codRegimen.enable();
    this.consultaForm.controls.numeroDAM.enable();
    this.consultaForm.controls.fechaInicio.disable();
    this.consultaForm.controls.fechaFin.disable();
    this.consultaForm.controls.codAduanaDocumento.disable();
    this.consultaForm.controls.codPuestoControl.disable();
    this.consultaForm.controls.anoDocumento.disable();
    this.consultaForm.controls.numeroDocumento.disable();
    this.cargarAduanaPuno(this.aduanaFuncionario);
  }

  enabledFechas() {
    this.consultaForm.controls.fechaInicio.enable();
    this.consultaForm.controls.fechaFin.enable();
    this.consultaForm.controls.codAduanaDAM.disable();
    this.consultaForm.controls.anoDAM.disable();
    this.consultaForm.controls.codRegimen.disable();
    this.consultaForm.controls.numeroDAM.disable();
    this.consultaForm.controls.codAduanaDocumento.disable();
    this.consultaForm.controls.codPuestoControl.disable();
    this.consultaForm.controls.anoDocumento.disable();
    this.consultaForm.controls.numeroDocumento.disable();
  }

  limpiar(){
    if(this.tipoOrigen = "IA"){
    this.maxLengthNumDoc = 10;
    } else{
      this.maxLengthNumDoc = 6;
    }
    this.consultaForm = this.formBuilder.group({
      codEmprTrans: [''],
      tipoDocumento: [{ value: '1', disabled: false}, Validators.required],
      estado: ['01'],
      tipoControl: [{ value:' ', disabled: false}],
      codPaisPlaca: [''],
      numPlaca: [''],
      numeroRucEmprTrans: [''],
      tipoBusqueda: ['', [Validators.required]],
      codAduanaDocumento: [{ value:this.aduanaFuncionarioLogueo, disabled: true }],
      codPuestoControl: [{ value: '', disabled: true }],
      anoDocumento: [{ value: this.date.getFullYear(), disabled: true }],
      numeroDocumento: [{ value: '', disabled: true }],
      numeroRucRemitente: [''],
      codAduanaDAM: [{ value: this.aduanaFuncionarioLogueo, disabled: true }],
      anoDAM: [{ value: this.date.getFullYear(), disabled: true }],
      codRegimen: [{ value: '10', disabled: true }],
      numeroDAM: [{ value: '', disabled: true }],
      fechaInicio: new FormControl({ value: new Date(this.date.getFullYear(), this.date.getMonth(), 1), disabled: true }),
      fechaFin: new FormControl({ value: this.date, disabled: true }),
      descRazonSocialEmprTrans: new FormControl(),
      descRazonSocialRemitente: new FormControl()
    });
    this.buscarRUCIntranet('1');
    this.consultaForm.controls.codEmprTrans.setValue('');
    this.consultaForm.controls.numeroRucEmprTrans.setValue('');
    this.consultaForm.controls.codEmprTrans.enable();
    this.consultaForm.controls.numeroRucEmprTrans.enable();
    this.cargarAduanaPuno(this.aduanaFuncionarioLogueo);

  }



}
