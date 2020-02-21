export interface Cep {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}

export interface CepAwesome {
    cep: string;
    address_type: string;
    address_name: string;
    address: string;
    district: string;
    city: string;
    state: string;
    lat: string;
    lng: string;
    city_ibge: string;
    ddd: string;
}


