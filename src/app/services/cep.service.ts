import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { CepAwesome, Cep } from '../models/cep';


@Injectable({
    providedIn: 'root'
})
export class CepService {
    // readonly viaCepUrl = 'https://viacep.com.br/ws/';
    readonly awesomeApiUrl = 'https://cep.awesomeapi.com.br/json/';

    constructor(private http: HttpClient) {
    }

    getCep(cep: string): Observable<CepAwesome> {
        return this.http.get<CepAwesome>(`${this.awesomeApiUrl + cep}`);
    }
}
