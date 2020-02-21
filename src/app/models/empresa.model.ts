export interface Empresa {
    bairro:      string;
    cep:         string;
    cidade:      string;
    cnpj:        string;
    complemento: string;
    email:       string;
    estado:      string;
    id:          number;
    logradouro:  string;
    nome:        string;
    numero:      string;
    razaoSocial: string;
    tipoEmpresa: number;
}

export interface EmpresaResponse {
    cnpj:        string;
    email:       string;
    contato:     string;
    enderecos:   Endereco[];
    id:          number;
    nome:        string;
    razaoSocial: string;
    tipoEmpresa: number;
}

export interface Endereco {
    bairro:      string;
    cep:         string;
    cidade:      string;
    complemento: string;
    estado:      string;
    id:          number;
    logradouro:  string;
    numero:      string;
}

export interface PageEmpresas {
    content:          EmpresaResponse[];
    empty:            boolean;
    first:            boolean;
    last:             boolean;
    number:           number;
    numberOfElements: number;
    pageable:         Pageable;
    size:             number;
    sort:             Sort;
    totalElements:    number;
    totalPages:       number;
}

export interface Content {
    cnpj:        string;
    email:       string;
    enderecos:   Endereco[];
    id:          number;
    nome:        string;
    razaoSocial: string;
    tipoEmpresa: number;
}

export interface Pageable {
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    sort:       Sort;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}