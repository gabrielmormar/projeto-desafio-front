import { Component, OnInit } from '@angular/core';
import { Empresa, EmpresaResponse } from '../models/empresa.model';
import {LazyLoadEvent} from 'primeng/primeng';
import { EmpresaService } from '../services/empresa.service';

// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datasource: EmpresaResponse[];

  empresas: EmpresaResponse[];

  totalRecords: number;

  cols: any[];

  loading: boolean;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {

    this.empresaService.getEmpresas().subscribe(res => {
      this.datasource = res;
      console.log(res);
      this.totalRecords = this.datasource.length;
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'nome', header: 'Nome' },
      { field: 'cnpj', header: 'CNPJ' },
    ];



    this.loading = true;

  }

  excluirEmpresa(row) {
    console.log(row);
    this.empresaService.deleteEmpresa(row.id).subscribe(
      res => {
        console.log(res);
      }
    );
    this.datasource.splice(row, 1);
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
        if (this.datasource) {
            this.empresas = this.datasource.slice(event.first, (event.first + event.rows));
            this.loading = false;
        }
    }, 1000);
}



}
