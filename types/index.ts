export interface User{
   id: string;
   name: string;
   email:string;
   createAt:Date;
   image: string;
   roleId: string;
}

export interface UserQuery{
    users: User[];
}

export interface Role {
    id: string;
    name: string;
    createAt: Date;
    updatedAt:Date;
}

export interface RolesQuery {
    roles: Role[];
}