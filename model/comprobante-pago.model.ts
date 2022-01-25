import { DataCatalogo } from "./domain/data-catalogo.model";
import { Ubigeo } from "./common/ubigeo.model";

export class ComprobantePago {
  numCorrelativo!: number;
  tipoComprobante: DataCatalogo = new DataCatalogo;
  numRucDestinatario!: string;
  desRazonSocialDestinatario!: string;
  motivoDeTraslado: DataCatalogo = new DataCatalogo;
  ubigeoDestino: Ubigeo = new Ubigeo;
  indEliminado: boolean = false;
}
