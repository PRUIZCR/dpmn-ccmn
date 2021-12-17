import { Datacatalogo } from 'src/app/models/datacatalogo';
import { ConstantesCadenas } from 'src/app/utils/constantescadenas';

export class ConstantesListas {
  static LISTA_ESTADOS: Datacatalogo[] = [(new Datacatalogo()).inicializar(ConstantesCadenas.ESTADO_NO_VIGENTE, "NO VIGENTE"),
                                          (new Datacatalogo()).inicializar(ConstantesCadenas.ESTADO_VIGENTE, "VIGENTE"),
                                          (new Datacatalogo()).inicializar(ConstantesCadenas.ESTADO_TODOS, "TODOS")];
  static COLUMNAS_GRID_UNIDAD_DESPACHO: string[] = ['numUnidadDespacho', 'descripcion', 'regimenes', 'indSorteoZona', 'fecInicioVigencia', 'fecFinVigencia'];
  static COLUMNAS_GRID_REGIMENES: string[] = ['select', 'cod_datacat', 'des_corta'];
  static NOMBRE_DE_MESES: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  static LISTA_MENSAJES_CONFIRMACION: string[] = ["42206", "42207", "42208", "42209"];
  static COLUMNAS_GRID_ZONA: string[] = ['numZona','nombre','descripcion','indSusceptible','fecInicioVigencia','fecFinVigencia'];
  static COLUMNAS_GRID_TURNOS: string[] = ['numTurno', 'nombre', 'hraInicio', 'hraFin', 'hraCorte', 'zonas', 'fecInicioVigencia', 'fecFinVigencia'];
  static COLUMNAS_GRID_ZONAS_DE_TURNOS: string[] = ['select', 'descripcion', 'fecInicioVigencia', 'fecFinVigencia'];
  static COLUMNAS_GRID_CRITERIOS: string[] = ['tipoCriterio.desDatacat', 'cntPeso'];
  static COLUMNAS_GRID_CRITERIOS_PONDERADO: string[] = ['criterio.desDatacat', 'porCriterio', 'verHistorial'];
  static COLUMNAS_GRID_HISTORICO_PONDERACION_CRITERIOS: string[] = ['cntPeso', 'codUsuarioModifica', 'porCriterio', 'fechaModifica'];
  static COLUMNAS_GRID_GRUPO_ALMACENES: string[] = ['ruc', 'codLocalAnexo', 'codOperador', 'nombre', 'razonSocial', 'direccion', 'codUbigeo', 'zonas'];
  static COLUMNAS_GRID_FUNCIONARIO: string[] = ['seleccion', 'codPers', 'apPate', 'apMate', 'nombres'];
  static COLUMNAS_GRID_FUNCIONARIO_RESUMEN: string[] = ['codigo', 'fecInicio', 'fecFin', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'columnaRetirar', 'columnaModificarVigencia', 'columnaNuevaVigencia'];
  static COLUMNAS_GRID_FUNCIONARIO_REGISTRADO: string[] = ['codPers', 'nombres', 'columnaRetirar'];
  static COLUMNAS_GRID_FUNCIONARIO_DISPONIBLE: string[] = ['codPers', 'nombres', 'columnaRetirar'];
  static COLUMNAS_GRID_ASIGNACION_FUNCIONARIO_DISPONIBLE: string[] = ['codPers', 'apPate', 'apMate', 'nombres'];
  static COLUMNAS_GRID_ASIGNACION_ZONA_DISPONIBLE: string[] = ['nombre', 'cantidadFuncionarios'];
  static COLUMNAS_GRID_ZONA_ASIGNADA: string[] = ['zona', 'cantidad', 'funcionarios'];
  static COLUMNAS_GRID_SORTEOS_CONSULTA: string[] = ['unidadDespacho', 'descripcion', 'turno', 'fecInicioVigencia', 'fecFinVigencia', 'cargaMaxima', 'tipoSorteo'];
  static COLUMNAS_GRID_SORTEOS_EDICION: string[] = ['unidadDespacho', 'descripcion', 'turno', 'fecInicioVigencia', 'fecFinVigencia', 'cargaMaxima', 'ver'];
  static COLUMNAS_GRID_DECLARACIONES: string[] = ['select','cabDeclara.numDeclaracion','numeroCargaLaboral','cabDeclara.rsocialAlmacenAduanero','cabDeclara.dirAlmacenAduanero','desImpoFrecuente','cabDeclara.desGarantia160'];
  static COLUMNAS_GRID_DECLARACIONES_REASIGNACION: string[] = ['cabDeclara.numDeclaracion','numeroCargaLaboral','cabDeclara.rsocialAlmacenAduanero','cabDeclara.dirAlmacenAduanero','desImpoFrecuente','cabDeclara.desGarantia160'];
  static COLUMNAS_GRID_DECLARACIONES_DETALLE_PAQUETE : string[] = ['numDUA', 'cabDeclara.numDeclaracion','numeroCargaLaboral','cabDeclara.rsocialAlmacenAduanero','cabDeclara.dirAlmacenAduanero','cabDeclara.codRiesgoOea','cabDeclara.desGarantia160'];
  static COLUMNAS_GRID_DECLARACION: string[] = ['declaracion', 'cargaLaboral', 'almacenAduanero', 'direccion', 'importadorOEA', 'garantia160','serie'];
  static COLUMNAS_GRID_CONSULTAS_FUNCIONARIO_RESUMEN: string[] = ['codigo', 'fecInicio', 'fecFin', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'vermotivo'];
  static COLUMNAS_GRID_CONSULTAS_FUNCIONARIO_RESUMEN_ASIGNACIONES: string[] =  ['fecInicio', 'fecFin', 'unidadesDespacho', 'grupoFuncionarios', 'turno', 'vermotivo'];
  static COLUMNAS_GRID_HORARIOS: string[] = ['horaCorte', 'horaSorteo'];
}
