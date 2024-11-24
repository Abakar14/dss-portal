import { ContactLevel } from "./enums/contact-level";
import { Gender } from "./enums/gender";
import { RelationShip } from "./relation-ship";
import { AddressCreateDto } from "./school";
import { CourseResponseDto, TeacherDto } from "./teacher";



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
    schoolId: number;    
    birthDate: string;
    dateOfBirth: string;
    gender:Gender;
    addressCreateDto: AddressCreateDto;
    guardianCreateDtos: GuardianCreateDto[];
    courses: CourseResponseDto[];
    teachers: TeacherDto[];   
}

export interface GuardianCreateDto{
   
    schoolId: number;    
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

