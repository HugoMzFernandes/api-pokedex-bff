import { PokemonDataViewModel, PokemonStat, PokemonDataDto } from "../models";
import { ResultViewModel } from "src/shared";

export class PokemonAdaptor {
  static pokemonData(data: PokemonDataViewModel): ResultViewModel<PokemonDataDto> {  
    return {
      data: {
        name: data?.name,
        id: data?.id,
        type: data.types.map(objeto => objeto.type.name).join(" - "),
        stats: data.stats.map(stat => ({
          baseStat: stat?.base_stat,
          name: stat?.stat?.name
        }))
      },
      error: null,
      message: 'Pokemon encontrado com sucesso',
      status: 200,
    }
  };
}