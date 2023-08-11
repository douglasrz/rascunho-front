import { Fundo } from "./fundo.model";

export interface ListaCalculo {
    data_base: string;
    fundos: Array<Fundo>;
}