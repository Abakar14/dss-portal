import { ContactLevel } from "./enums/contact-level";
import { Gender } from "./enums/gender";
import { RelationShip } from "./relation-ship";
import { AddressCreateDto } from "./school";
import { Course, Teacher } from "./teacher";


export interface StudentDetailsCreateDto {

    studentCreateDto: StudentCreateDto;
    addressCreateDto: AddressCreateDto;
   // guardianCreateDto: GuardianCreateDto; 

}


export interface StudentCreateDto {    
    
    firstName: string;
    lastName: string ;
    email: string ;
    phone: string ;    
    birthDate: string;
    dateOfBirth: string;
    gender:Gender;
    addressCreateDto: AddressCreateDto;
    guardianCreateDtos: GuardianCreateDto[];
    courses: Course[];
    teachers: Teacher[];   
}

export interface GuardianCreateDto{
   
    firstName: string;
    lastName: string;
    country: string;
    gender:Gender;
    contactLevel: ContactLevel;
    relationship: RelationShip;
    email: string;
    mobile: string;
    phone: string;
   
}

