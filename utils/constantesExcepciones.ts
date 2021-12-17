export class ConstantesExcepciones {
    static DEFAULT_TITTLE_EXCEPTION: string = 'Mensajes de Advertencia: ';
    static EXCEPCION_UNO: string = "La fecha de inicio de vigencia del Funcionario Aduanero debe ser igual o posterior a la fecha en que se registra.";
    static EXCEPCION_DOS: string = "La fecha de término de vigencia del Funcionario Aduanero debe ser igual o posterior a la fecha de inicio de vigencia.";
    static EXCEPCION_CUATRO: string = 'Registre por lo menos un funcionario aduanero en el presente Grupo';
    static EXCEPCION_CINCO: string = 'Registre el motivo del retiro del funcionario aduanero';
    static EXCEPCION_OCHO: string = "Debe ingresar fecha de inicio de vigencia.";
    static EXCEPCION_NUEVE: string = "Fecha de inicio de vigencia es incorrecto.";
    static EXCEPCION_DIEZ: string = "Debe ingresar fecha de término de vigencia."; //cchavezt ATENCION BUGS
    static EXCEPCION_ONCE: string = "Fecha de término de vigencia es incorrecto.";
    static EXCEPCION_DIECISIETE: string = "Debe seleccionar aduana.";
    static EXCEPCION_DIECISOCHO: string = "fecha-----.";
    static EXCEPCION_DIECINUEVE: string = "Debe seleccionar unidad de despacho.";
    static EXCEPCION_VEINTE: string = "Debe seleccionar grupo de funcionarios.";
    static EXCEPCION_VEINTIUNO: string = "Debe seleccionar turno.";
    static EXCEPCION_VEINTIDOS: string = "El período de consulta no debe ser mayor a (01) año.";
    static EXCEPCION_VEINTICUATRO: string = "Las fechas de inicio y término de vigencia ingresados, están fuera del rango de fechas de inicio y término de vigencia del turno {0} - {1}.";
    static EXCEPCION_HORARIO_NO_EXISTE: string = "Debe seleccionar horario.";
    static EXCEPCION_ANFORA_NO_EXISTE: string = "Debe seleccionar ánfora.";
    static demo_TITULO_FUNCIONARIO_REGISTRADO_TURNO = "FUNCIONARIOS REGISTRADOS EN EL TURNO {0} DEL {1}";
    static EXCEPCION_VEINTITRES: string = 'Las fechas de inicio y término de vigencia ingresados se traslapa con el rango de fechas de inicio y término de vigencia de los parámetros de búsqueda.';
    static EXCEPCION_FUNCIONARIOS_NO_ENCONTRADOS = "No se encontraron Funcionarios Disponibles.";
    static EXCEPCION_PAQUETES_NO_ENCONTRADOS = "No se encontraron paquetes asignados.";
    static EXCEPCION_VEINTICINCO: string = "Las fechas de inicio y término de vigencia ingresados, están fuera del rango de fechas de inicio y término de vigencia de la unidad de despacho {0} - {1}.";
}
