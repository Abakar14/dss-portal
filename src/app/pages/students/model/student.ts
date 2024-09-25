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

export interface Teacher{
     id: number;
     firstName: string;
     lastName: string ;
     
}
export interface Course{
     id: number;
     name: string;
    
     
}

export interface Address{
     id: number;
     street: string;
     city: string ;
     
}
