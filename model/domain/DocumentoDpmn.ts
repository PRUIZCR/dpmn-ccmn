import { DataCatalogo } from "./data-catalogo.model";
import { DatoComplementario } from "../domain/dato-complementario.model";
import { EmpresaTransporte } from "../domain/empresa-transporte.model";
import { Conductor } from "../domain/conductor.model";
import { ComprobantePago } from "../domain/comprobante-pago.model";
import { Datacatalogo } from "../datacatalogo";
export class DocumentoDpmn {
    [x: string]: any;
    numCorrelativo:        number;
    aduana:                Datacatalogo;
    annDpmn:               number;
    numDpmn:               number;
    fecDpmn:               number;
    estado:                Datacatalogo;
    aduanaDescarga:        DataCatalogo;
    puestoControlDescarga: DataCatalogo;
    actorRegistro:         Datacatalogo;
    codVariableControl:    string;
    tipoAnulacion:         DataCatalogo;
    datoComplementario:    DatoComplementario;
    empresaTransporte:     EmpresaTransporte;
    conductor:             Conductor;
    comprobantePago:       ComprobantePago[];
}
