import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { validarCNPJ } from '../utils/cnpj';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CepService } from '../services/cep.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-form-empresa',
    templateUrl: './form-empresa.component.html',
    styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

    formModel: FormGroup;
    submitted = false;
    id: number;

    constructor(
        private formBuilder: FormBuilder,
        private empresaService: EmpresaService,
        private location: Location,
        private route: ActivatedRoute,
        private cepService: CepService,
        private router: Router,
        private toast: ToastrService,
    ) { }

    ngOnInit() {
        // pega o id da empresa caso seja edição
        this.id = +this.route.snapshot.paramMap.get('id');
        this.initForm();
        if (this.id) {
            this.preencherForm();
        }
    }

    get formControls() { return this.formModel.controls; }
    get getId() { return this.id; }

    onSubmit() {
        this.submitted = true;

        if (this.formModel.invalid) {
            return;
        }

        if (this.id) {
            this.empresaService.updateEmpresa(this.formModel.value, this.id)
                .subscribe(res => {
                    console.log(res);
                    this.router.navigate(['']);
                });
        } else {
            this.empresaService.createEmpresa(this.formModel.value)
                .subscribe(data => {
                    console.log(data);
                    this.router.navigate(['']);
                    // this.router.navigate(['list-user']);
            });
        }

    }

    initForm() {
        this.formModel = this.formBuilder.group({
            cnpj: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            contato: ['', Validators.required],
            id: [''],
            tipoEmpresa: ['', Validators.required],
            logradouro: ['', Validators.required],
            nome: ['', Validators.required],
            numero: ['', Validators.required],
            razaoSocial: [''],
            bairro: ['', Validators.required],
            cep: ['', Validators.required],
            complemento: ['', Validators.required],
            cidade: ['', Validators.required],
            estado: ['', Validators.required],
        });
    }

    preencherForm() {
        this.empresaService.getEmpresaById(this.id).subscribe(emp => {
            console.log(emp);
            this.formModel.patchValue(
                {
                    id: emp.id,
                    nome: emp.nome,
                    cnpj: emp.cnpj,
                    email: emp.email,
                    tipoEmpresa: emp.tipoEmpresa,
                    razaoSocial: emp.razaoSocial,
                    contato: emp.contato,
                    logradouro: emp.enderecos[0].logradouro,
                    numero: emp.enderecos[0].numero,
                    bairro: emp.enderecos[0].bairro,
                    cep: emp.enderecos[0].cep,
                    complemento: emp.enderecos[0].complemento,
                    cidade: emp.enderecos[0].cidade,
                    estado: emp.enderecos[0].estado,
                }
            )
        });
    }

    onKey(event: any) {
        const valor = event.target.value;
        if (valor.length == 9) {
            this.preencherCep(valor);
        }
    }

    preencherCep(str: string) {
        this.cepService.getCep(str).subscribe(
            (res) => {
                this.formModel.patchValue({
                    logradouro: res.address_name,
                    bairro: res.district,
                    cidade: res.city,
                    estado: res.state
                });
                console.log(res);
                this.toast.success('CEP encontrado', 'Sucesso');
            },
            error => this.toast.error(
                'Não foi possível recuperar os dados automaticamente. Por favor, verifique novamente.',
                'CEP não encontrado'
            ),
            () => {
                // todo
            });
    }

}
