export interface Documento {
    numeroDeDocumentoDescarga: string;
    estado:                    Datacatalogo;
    paisPlaca:                 Datacatalogo;
    placa:                     null;
    placaCarreta:              string;
    flujoVehiculo:             Datacatalogo;
    fechaDeRegistro:           string;
    rucDelRemitente:           string;
    cantidadDeSeries:          number;
    cantidadDeControles:       number;
    fechaDelUltimoControl:     string;
    canalDelUltimoControl:     Datacatalogo;
}

export interface Datacatalogo {
    codDatacat: string;
    desDataCat: null | string;
}
