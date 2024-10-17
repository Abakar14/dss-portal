export interface User {
}

export interface UserProfile {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    id: number;
    roles: Role[];
    // Add other fields as needed
  }


export interface Role{
    name: string;
    id: number;
}
