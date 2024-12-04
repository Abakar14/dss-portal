import { Gender } from "./enums/gender";

export interface User {
}

export interface UserProfile {
    
    id: number;
    schoolId:number;
    firstname: string;
    lastname: string;
    username: string;
    gender: string;
    email: string;
    addedBy: string;
    role: Role;
    
  }

  export interface Role{
    
    id: number;
    name: string;
    description: string;
    parentRoleId: number;
    addedBy: string;
    isActive: boolean;
    deleted: boolean;
    addedOn: string;
    modifiedBy: string;
    modifiedOn: string;
    childRoles: Role[];
    permissions:PermissionDto[];
}

  export interface UserCreateDto {

    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    gender: Gender,
    schoolId: 1,
    roleId: 6
  }


  export interface RoleDto {
    
    id: number;   
    name: string;
    description: string;  
    deleted: boolean;   
    isActive:boolean;
    addedOn:string;
    modifiedOn:string;
    addedBy:string;
    childRoleIds: number[];
    permissionIds: number[];
  
  }
export interface PermissionDto {
  
  id: number;   
  name: string;
  description: string;  
  deleted: boolean;   
  isActive:boolean;
  addedOn:string;
  modifiedOn:string;
  addedBy:string;
}







