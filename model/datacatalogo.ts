export class Datacatalogo {
  cod_catalogo: string;
  cod_datacat: string;
  des_corta: string;
  des_datacat: string;
  cod_estado: string;
  codCatalogo: string;
  codDatacat: string;
  fecInidatcat: Date;
  fecInicat: Date;
  fecFindatcat: Date;
  fecFinvigorig: Date;
  desDatacat: string;
  desCorta: string;
  desAcronimo: string;
  codEstado: string;
  codUsuing: string;
  fecIng: Date;
  codUsumodif: string;
  fecModif: Date;
  indPermanente: string;
  constructor() { }

  inicializar(cod_datacat: string, des_corta: string) {
    this.cod_datacat = cod_datacat;
    this.des_corta = des_corta;
    return this;
  }
}
