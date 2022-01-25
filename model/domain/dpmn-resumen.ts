import { DataCatalogo } from "../common/data-catalogo.model";
import { ComprobanteDpmnResumen } from "../common/data-comprobante.model";

export class DpmnResumen {
  cod: number;
  msg: string;
  numCorredoc: number;
  numeroDeDocumentoDescarga: string;
  estado: DataCatalogo;
  paisPlaca: DataCatalogo;
  placa: string;
  paisPlacaCarreta: DataCatalogo;
  placaCarreta: string;
  flujoVehiculo: DataCatalogo;
  fechaDeRegistro: Date;
  rucDelRemitente: string;
  cantidadDeSeries: number;
  cantidadDeControles: number;
  fechaDelUltimoControl: Date;
  canalDelUltimoControl: DataCatalogo;
  funcionarioAduanero: string;
  lstComprobante: ComprobanteDpmnResumen[];
  nro: string;
}