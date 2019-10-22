import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Departamento, Provincia, Districto } from "./wrappers/ubigeos";

@Injectable({
  providedIn: "root"
})
export class UbigeoService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    return this.http.get("../assets/fileText.txt", { responseType: "text" });
  }

  public createDepartamento(dataDepartamento: string) {
    let datos = dataDepartamento
      .substring(0, dataDepartamento.length - 1)
      .split(" ");
    return new Departamento(datos[0], datos[1]);
  }

  public createProvincia(dataProvincia: string, dataDepartamento?: string) {
    let aux = dataProvincia.substring(1);
    let datos = aux.replace(" ", "_").split("_");

    if (dataDepartamento) {
      return new Provincia(
        datos[0],
        datos[1],
        this.createDepartamento(dataDepartamento)
      );
    }
    return new Provincia(datos[0], datos[1]);
  }

  public createDistricto(dataDistricto: string, dataProvincia?: string) {
    let aux = dataDistricto.substring(1);
    let datos = aux.replace(" ", "_").split("_");

    console.log(datos);
    if (dataProvincia) {
      return new Districto(
        datos[0],
        datos[1],
        this.createProvincia(dataProvincia)
      );
    }
    return new Districto(datos[0], datos[1]);
  }

  public checkIfexits(list: any[], obj: any) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].codigo === obj.codigo) {
        return true;
      }
    }
    return false;
  }
}
