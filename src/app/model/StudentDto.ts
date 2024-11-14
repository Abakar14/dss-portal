import { AddressDto } from "./school";
import { Course, Teacher } from "./teacher";





export interface StudentDetails {
     studentDto: StudentDto;
     addressDto: AddressDto;
     guardianDto: GuardianDto;     
}

export interface StudentDto {
    
     id: number;
     firstName: string;
     lastName: string ;
     email: string ;
     phone: string ;
     fileName: string ;
     addedOn: Date;
     modifiedOn: Date;
     matNumber: string;
     active:boolean;
     insertedBy:string;
     profilePictureUrl: string;
     dateOfBirth: Date;
     addressDto: AddressDto;
     courses: Course[];
     teachers: Teacher[];
   
}


export interface GuardianDto{
     id: number;
     firstName: string;
     lastName: string;
     country: string;
     email: string;
     mobile: string;
     phone: string;
    
}

export interface Consent{
     id: number;     
}