import { Component, OnInit } from "@angular/core";
import { UbigeoService } from "../ubigeo.service";
import { Departamento, Provincia, Districto } from "../wrappers/ubigeos";

@Component({
  selector: "app-file-reader",
  templateUrl: "./file-reader.component.html"
})
export class FileReaderComponent implements OnInit {
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  districtos: Districto[] = [];

  constructor(private fileReaderService: UbigeoService) {}

  ngOnInit() {
    this.fileReaderService.getData().subscribe(data => {
      data = data.replace(/"/g, "");
      console.log(data);
      for (const line of data.split(/[\r\n]+/)) {
        let items = line.split("/");
        this.setDepartamentos(items[0]);
        this.setProvincias(items[1], items[0]);
        this.setDistrictos(items[2], items[1]);
      }
    });
  }

  setDepartamentos(data: string) {
    let departamento = this.fileReaderService.createDepartamento(data);
    if (!this.departamentos.length) {
      this.departamentos.push(departamento);
      return;
    }
    if (
      !this.fileReaderService.checkIfexits(this.departamentos, departamento)
    ) {
      this.departamentos.push(departamento);
    }
  }

  setProvincias(dataProvincia: string, dataDepartamento: string) {
    let provincia = this.fileReaderService.createProvincia(
      dataProvincia,
      dataDepartamento
    );

    if (provincia.codigo === "") return;
    if (!this.provincias.length) {
      this.provincias.push(provincia);
      return;
    }
    if (!this.fileReaderService.checkIfexits(this.provincias, provincia)) {
      this.provincias.push(provincia);
    }
  }

  setDistrictos(dataDistricto: string, dataProvincia: string) {
    let districto = this.fileReaderService.createDistricto(
      dataDistricto,
      dataProvincia
    );

    if (districto.codigo === "") return;
    if (!this.districtos.length) {
      this.districtos.push(districto);
      return;
    }
    if (!this.fileReaderService.checkIfexits(this.districtos, districto)) {
      this.districtos.push(districto);
    }
  }
}
