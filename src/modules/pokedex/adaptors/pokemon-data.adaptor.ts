import { PokemonDataViewModel, PokemonDataDto } from "../models";
import { ResultViewModel } from "src/shared";

export class PokemonAdaptor {
  static pokemonData(data: PokemonDataViewModel): ResultViewModel<PokemonDataDto> {  
    return {
      data: {
        name: data?.name,
        id: data?.id,
        type: data.types.map(type => ({
          typeName: type?.type?.name
        })),
        stats: data.stats.map(stat => ({
          baseStat: stat?.base_stat,
          name: stat?.stat?.name
        })),
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`
      },
      error: null,
      message: 'Pokemon encontrado com sucesso',
      status: 200,
    }
  };
}