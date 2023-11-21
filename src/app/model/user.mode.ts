import { Role } from "./role.model";

export interface User {
    id?: number;
    name: string;
    phone: string;
    email: string;
    rol: Role;
}