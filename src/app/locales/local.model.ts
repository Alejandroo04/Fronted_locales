import { Categoria } from "../model/categoria.model";
import { Subcategoria } from "../model/subcategoria.model";
import { User } from "../model/user.mode";


export interface Local {
    id:number;
    nombre: string;
    ubicacion: string;
    telefono: number;
    representante: string;
    representante_legal: User;
    categoria_id: string;
    subcategoria_id: string;
    encargado_id: string;
    encargado:User;
    category: Categoria;
    subcategory: Subcategoria;
    estado_id: number;
    estado: any;
    // Agrega cualquier otra propiedad que necesites
  }
  