import { DataCatalogo } from "../common/data-catalogo.model";
import { totalesAduanas } from "./totalesAduana";
export interface reporteresumido {
    totalPorAduana:                        number;
    totalPorEstado:                        number;
    totalPorTipoControl:                   number;
    totalPorUsuarioExterno:                null;
    totalPorFuncionarioAduanero:           number;
    totalesPorAduana:                      totalesAduanas[];
    totalesPorEstado:                      IteratorTotalesPorAduana[];
    totalesPorTipoControl:                 any[];
    totalesPorUsuarioExterno:              any[];
    totalesPorFuncionarioAduanero:         any[];
    iteratorTotalesPorAduana:              IteratorTotalesPorAduana[];
    iteratorTotalesPorEstado:              IteratorTotalesPorAduana[];
    iteratorTotalesPorTipoControl:         any[];
    iteratorTotalesPorFuncionarioAduanero: any[];
    iteratorTotalesPorUsuarioExterno:      any[];
}

export interface IteratorTotalesPorAduana {
    concepto: DataCatalogo;
    cantidad: number;
}
