import { PokemonAdaptor } from '../../src/modules/pokedex/adaptors/pokemon-data.adaptor'
import { PokemonDataViewModel, PokemonDataDto } from '../../src/modules/pokedex/models';
import { ResultViewModel } from '../../src/shared';

describe('PokemonAdaptor', () => {
  it('should transform pokemon data to ResultViewModel', () => {
    const mockData: PokemonDataViewModel = {
      name: 'bulbasaur',
      id: 1,
      types: [{
        type: {
          name: 'grass',
          url: ''
        },
        slot: 0
      }],
      stats: [{
        base_stat: 45, stat: {
          name: 'hp',
          url: ''
        },
        effort: 0
      }],
      base_experience: 0,
      height: 0,
      is_default: false,
      order: 0,
      weight: 0,
      abilities: undefined,
      forms: undefined,
      game_indices: undefined,
      held_items: undefined,
      location_area_encounters: '',
      moves: undefined,
      past_types: undefined,
      sprites: undefined,
      cries: undefined,
      species: undefined
    };

    const expectedResult: ResultViewModel<PokemonDataDto> = {
      data: {
        name: 'bulbasaur',
        id: 1,
        type: [{ typeName: 'grass' }],
        stats: [{ baseStat: 45, name: 'hp' }],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
      error: null,
      message: 'Pokemon encontrado com sucesso',
      status: 200,
    };

    const result = PokemonAdaptor.pokemonData(mockData);

    expect(result).toEqual(expectedResult);
  })
})