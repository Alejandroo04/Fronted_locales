import { Subcategoria } from './subcategoria.model';

export interface Categoria {
    id: number;
    name: string;
    subCategorias: Subcategoria[];
}