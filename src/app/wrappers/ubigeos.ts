export class Departamento {
  codigo: string;
  nombre: string;

  constructor(codigo: string, nombre: string) {
    this.codigo = codigo;
    this.nombre = nombre;
  }
}

export class Provincia {
  codigo: string;
  nombre: string;
  departamento: Departamento;
  constructor(codigo: string, nombre: string, departamento?: Departamento) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.departamento = departamento ? departamento : null;
  }
}

export class Districto {
  codigo: string;
  nombre: string;
  provincia: Provincia;
  constructor(codigo: string, nombre: string, provincia?: Provincia) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.provincia = provincia ? provincia : null;
  }
}
