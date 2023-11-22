import { Role } from "./role.model";

export interface User {
    id: number;
    name: string;
    last_name: string;
    phone: string;
    email: string;
    rol_id: Role;
}