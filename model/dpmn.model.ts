import { DataCatalogo } from "./domain/data-catalogo.model";
import { DatoComplementario } from "./dato-complementario.model";
import { EmpresaTransporte } from "./empresa-transporte.model";
import { Conductor } from "./conductor.model";
import { ComprobantePago } from "./comprobante-pago.model";

export class  Dpmn {
  numCorrelativo!: number;
  aduana: DataCatalogo = new DataCatalogo;
  annDpmn!: number;
  numDpmn!: number;
  fecDpmn: any;
  estado: DataCatalogo = new DataCatalogo;
  aduanaDescarga: DataCatalogo = new DataCatalogo;
  puestoControlDescarga: DataCatalogo = new DataCatalogo;
  actorRegistro: DataCatalogo = new DataCatalogo;
  codVariableControl!: string;
  tipoAnulacion: DataCatalogo = new DataCatalogo;
  datoComplementario!: DatoComplementario;
  empresaTransporte: EmpresaTransporte = new EmpresaTransporte;
  conductor: Conductor = new Conductor;
  comprobantePago!: ComprobantePago[];
}
