import { DataCatalogo } from "./data-catalogo.model";
import { Ubigeo } from "../common/ubigeo.model";

export class ComprobantePago {
  numCorrelativo: number;
  tipoComprobante: DataCatalogo;
  numRucDestinatario: string;
  desRazonSocialDestinatario: string;
  desRazonSocialRemitente: string;
  motivoDeTraslado: DataCatalogo;
  nomEmpresa:string;
  numCartaPorte:string;
  numRucRemitente:string;
  ubigeoDestino: Ubigeo;
  indEliminado: boolean;
  numSerie: string;
  numGuia:string;
  numRuc:string;
  numComprobante:string;
}
