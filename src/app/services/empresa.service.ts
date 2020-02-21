import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa, EmpresaResponse, PageEmpresas } from '../models/empresa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  baseUrl: string = 'http://localhost:8080/empresas/';

  constructor(private http: HttpClient) { }

  getEmpresas() : Observable<EmpresaResponse[]> {
    return this.http.get<EmpresaResponse[]>(this.baseUrl);
  }

  getEmpresaById(id: number): Observable<EmpresaResponse> {
    return this.http.get<EmpresaResponse>(this.baseUrl + id);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.baseUrl, empresa);
  }

  updateEmpresa(empresa: Empresa, id: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + id, empresa);
  }

  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + id);
  }

  getEmpresasByNomeCnpj(nome: string, cnpj: string): Observable<PageEmpresas> {
    return this.http.get<PageEmpresas>(this.baseUrl);
  }

}
