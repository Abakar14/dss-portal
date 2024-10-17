import { Address } from "./school";
import { Course, Teacher } from "./teacher";

export interface Student {
    
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
     address: Address;
     courses: Course[];
     teachers: Teacher[];
     gpa:string;

    
}

export interface Guardian{
     id: number;
     name: string;
    
     
}

export interface Consent{
     id: number;
     name: string;
    
     
}