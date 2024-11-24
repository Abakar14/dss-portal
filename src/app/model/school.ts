export interface School {
}

export interface Classe {
}
export interface AddressCreateDto {
    street: string;
    streetNumber: number
    city: string ;
    postalCode: string;

}
export default interface AddressResponseDto {

    id: number;
    street: string;
    streetNumber: number
    city: string ;
    postalCode: string;
    isActive:boolean;
    addedOn: string;
    modifiedOn: string;
    addedBy: string;
    country: string;
}

export interface Employee {
}