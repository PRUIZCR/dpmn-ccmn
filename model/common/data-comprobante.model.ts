import { DataCatalogo } from "../common/data-catalogo.model";
import { Ubigeo } from "../common/ubigeo.model";

export class ComprobanteDpmnResumen {
    numCorrelativo!: number;
    tipoComprobante!: DataCatalogo;
    numRucDestinatario!: string;
    desRazonSocialDestinatario!: string;
    motivoDeTraslado!: DataCatalogo;
    ubigeoDestino!: Ubigeo;
    numSerie!: string;
    numGuia!: string;
    numRucRemitente!: string;
    desRazonSocialRemitente!: string;
    numCartaPorte!: string;
    nomEmpresa!: string;
  }