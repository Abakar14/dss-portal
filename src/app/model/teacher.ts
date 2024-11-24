import AddressDto from "./school";

export interface TeacherDto {
    id: number;
    firstName: string;
    lastName: string ;
    email: string ;
    phone: string ;
    fileName: string ;
    birthDate: Date;
    birthPlace: string;
    addedOn: Date;
    modifiedOn: Date;
    matNumber: string;
    active:boolean;
    insertedBy:string;
    profilePictureUrl: string;
    address: AddressDto;
    courses: CourseResponseDto[];
   
     
}

export interface CourseResponseDto{
    id: number;
    name: string;
    description: string;
    deleted: boolean;
    addedOn: string;
    modifiedOn: string;
    active: boolean;
    updatedBy : string;
    addedBy: string;
    modifiedBy:string;
    documentIds: Number []; 
    teacher: TeacherDto;
    
}
