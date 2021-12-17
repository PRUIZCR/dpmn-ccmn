import { Canal } from "../model/common/canal.enum";
import { TipoControl } from "../model/common/tipo-control.enum";
export class ConstantesApp {



  static readonly RESOURCE_RUC : string = "/v1/controladuanero/ruc/";
  static readonly RESOURCE_PUESTO_CONTROL: string = "/v1/controladuanero/puestoscontrol/";
  static readonly RESOURCE_EMPRESA_TRANS: string = "/v1/controladuanero/empresasdetranspinter/";
  static readonly RESOURCE_CONSULTA_DPMN: string = "/v1/controladuanero/consultadpmn/generarreporte";

  static readonly RESOURCE_ARCHIVOS_ADJUNTOS : string = "/v1/controladuanero/archivosadjuntodpmn/";
  static readonly RESOURCE_DATOS_DECLARACION : string = "/v1/controladuanero/dpmns/";
  static readonly RESOURCE_DATOS_DECLARACION_EXPORT_PDF : string = "/v1/controladuanero/consultadpmn/exportarpdf";
  static readonly RESOURCE_DATOS_DECLARACION_EXPORT_EXCEL : string = "/v1/controladuanero/consultadpmn/exportarexcel";

  

static readonly RESOURCE_CONSULTA_CCMN: string = "/v1/controladuanero/scci/consultaccmn/generarreporte";
static readonly RESOURCE_DATOS_DECLARACION_CCMN : string = "/v1/controladuanero/scci/ccmns/";
static readonly RESOURCE_ARCHIVOS_ADJUNTOS_CCMN : string = "/v1/controladuanero/scci/archivosadjuntoccmn/";
static readonly RESOURCE_DATOS_DECLARACION_EXPORT_PDF_CCMN : string = "/v1/controladuanero/scci/consultaccmn/exportarpdf";
static readonly RESOURCE_DATOS_DECLARACION_EXPORT_EXCEL_CCMN : string = "/v1/controladuanero/scci/consultaccmn/exportarexcel";
static readonly RESOURCE_PUESTO_CONTROL_CCMN: string = "/v1/controladuanero/scci/puestoscontrol/";
static readonly RESOURCE_EMPRESA_TRANS_CCMN: string = "/v1/controladuanero/scci/empresasdetranspinter/";


  /**
   * Nombre del key, almacenado en sessionstorage,
   * donde se guarda el Token de session
   */
  static readonly KEY_SESSION_TOKEN : string = "token-app-ctacorriente-impo-condpmn";

  /**
   * Nombre del key, almacenado en sessionstorage,
   * donde se guarda el valor userdata del token de session
   */
  static readonly KEY_SESSION_USER_DATA : string = "user-data-ctacorriente-impo-condpmn";

  /**
   * Nombre del key, almacenado en sessionstorage,
   * donde se guarda el RUC vinculado al token de session
   */
  static readonly KEY_SESSION_USER_RUC : string = "ruc-ctacorriente-impo-condpmn";

  static readonly KEY_SESSION_LOGIN : string = "login-ctacorriente-impo-condpmn";

  static readonly KEY_SESSION_ORIGEN : string = "origen-ctacorriente-impo-condpmn";

  static readonly KEY_SESSION_NRO_REGISTRO : string = "nroregistro-ctacorriente-impo-condpmn";

  static readonly COD_TIPO_COMP_GUIA_REMISION : string = "01";
  static readonly COD_TIPO_COMP_CARTA_PORTE : string = "02";

  static readonly ORIGEN_INTERNET : string = "IT";

  static readonly ORIGEN_INTRANET : string = "IA";

  static readonly COLOR_CANAL = new Map<string, string>([
    [Canal.ROJO, 'Red'],
    [Canal.NARANJA, 'Orange'],
    [Canal.VERDE, 'Green']
  ]);

  static readonly COLOR_CONTROL = new Map<string, string>([
    [TipoControl.FISICO, 'Red'],
    [TipoControl.DOCUMENTARIO, 'Orange']
  ]);

}
