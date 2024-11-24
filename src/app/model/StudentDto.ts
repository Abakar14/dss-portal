import { CommunicationType } from "./enums/communication-type";
import { ContactLevel } from "./enums/contact-level";
import { Gender } from "./enums/gender";
import { RelationShip } from "./relation-ship";
import AddressResponseDto from "./school";
import AddressDto from "./school";
import { CourseResponseDto, TeacherDto } from "./teacher";



export interface StudentDetails {
     studentDto: StudentDto;
     addressDto: AddressDto;
     guardianDto: GuardianDto;     
}

export interface StudentDto {
    
     id: number;
     schoolId: number;
     firstName: string;
     lastName: string ;
     gender: Gender;
     email: string ;
     phone: string ;
     mobile: string ;
     fileName: string ;
     country: string ;
     addedOn: Date;
     modifiedOn: Date;
     modifiedBy: string;
     matNumber: string;
     active:boolean;
     addedBy:string;
     profilePictureUrl: string;
     birthDate: Date;
     birthPlace: string;
     nameOfSchoolBefore: string;
     schoolLevel: string;
     hasCertificate: boolean;
     certificate: string;
     chronic_illnesse: string;
     doctorName: string;
     doctorAddress: string;
     communicationType: CommunicationType;
     addressResponseDto: AddressResponseDto;
     guardianResponseDtos: GuardianDto[];
     courseResponseDtos: CourseResponseDto[];
     teachers: TeacherDto[];
   
}


export interface GuardianDto{
     id: number;
     schoolId: number;
     firstName: string;
     lastName: string;
     country: string;
     email: string;
     mobile: string;
     phone: string;
     gender: Gender;
     relationship: RelationShip;
     contactLevel: ContactLevel;
     addressId: number;
     communicationType: CommunicationType;
    
}

export interface ConsentDto{
     id: number;     
}