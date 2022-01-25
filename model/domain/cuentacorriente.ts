import { DataCatalogo } from "../common/data-catalogo.model";

export class CuentaCorriente {
  numCorrelativo!: number;
  canalDelUltimoControl!: DataCatalogo;
  cantidadDeControles!: number;
  cantidadDeSeries!: number;
  estado!: DataCatalogo;
  fechaDeRegistro: any;
  fechaDelUltimoControl:any
  flujoVehiculo!: DataCatalogo;
  numeroDeDocumentoDescarga!: string;
  paisPlaca!: DataCatalogo;
  placa!: string;
  placaCarreta!: string;
  rucDelRemitente!: string;

}
