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
    modifiedBy: string;
    addedOn: string;
    modifiedOn: string;
    addedBy: string;
    country: string;
}


export default interface ClasseResponseDto {

    id: number;
    schoolId: number;
    name: string;
    description: string;   
    isActive:boolean;
    addedOn: string;
    modifiedOn: string;
    addedBy: string;
    modifiedBy: string;
}


export interface Employee {
}









    