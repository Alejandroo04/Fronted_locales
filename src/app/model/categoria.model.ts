import { Subcategoria } from './subcategoria.model';

export interface Categoria {
    id: number;
    nombre: string;
    subCategorias: Subcategoria[];
}