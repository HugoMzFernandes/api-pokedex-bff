import { Test, TestingModule } from '@nestjs/testing';
import { HttpService} from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { ResultViewModel } from '../../src/shared';
import { PokemonAdaptor } from '../../src/modules/pokedex/adaptors/pokemon-data.adaptor';
import { PokemonDataDto, PokemonDataViewModel } from '../../src/modules/pokedex/models';

import { PokedexService } from '../../src/modules/pokedex/pokedex.service';

import { of } from "rxjs";

describe('PokedexService', () => {
  let service: PokedexService;
  let httpServiceMock: HttpService;
  let cacheServiceMock: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokedexService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokedexService>(PokedexService);
    httpServiceMock = module.get<HttpService>(HttpService);
    cacheServiceMock = module.get<Cache>(CACHE_MANAGER);
  });

  it('should return cached data if available', async () => {
    const cachedData: PokemonDataViewModel = {
      name: 'bulbasaur',
      id: 0,
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
      species: undefined,
      stats: [],
      types: []
    };

    cacheServiceMock.get = jest.fn().mockReturnValueOnce(cachedData)

    const result = await service.getPokemonByNameData('bulbasaur');
    const emittedValue = await result.toPromise()

    expect(emittedValue).toEqual(PokemonAdaptor.pokemonData(cachedData) as ResultViewModel<PokemonDataDto>);
    expect(httpServiceMock.get).not.toHaveBeenCalled();
  });

  it('should fetch data from API if not cached', async () => {
    const apiResponse = { data: {
      name: 'charmander',
      id: 0,
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
      species: undefined,
      stats: [],
      types: []
    }};
    httpServiceMock.get = jest.fn().mockReturnValue(of(apiResponse))

    const result = await service.getPokemonByNameData('charmander');
    const emittedValue = await result.toPromise()

    expect(emittedValue).toEqual(PokemonAdaptor.pokemonData(apiResponse.data) as ResultViewModel<PokemonDataDto>);
    expect(cacheServiceMock.get).toHaveBeenCalledWith('charmander');
    expect(cacheServiceMock.set).toHaveBeenCalledWith('charmander', apiResponse.data);
  });
});