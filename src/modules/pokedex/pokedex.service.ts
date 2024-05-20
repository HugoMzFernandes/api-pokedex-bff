import { HttpService } from "@nestjs/axios";
import { Inject, Injectable} from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager"
import { BaseService } from "src/shared/services/base.service";
import { Observable, map, tap, of } from "rxjs";

import { ResultViewModel } from "src/shared";
import { PokemonAdaptor } from "./adaptors/pokemon-data.adaptor";
import { PokemonDataDto, PokemonDataViewModel } from "./models";

@Injectable()
export class PokedexService extends BaseService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    super('https://pokeapi.co/api/v2/pokemon')
  }

  async getPokemonByNameData(name: string): Promise<Observable<ResultViewModel<PokemonDataDto>>> {
    const cachedPokemonData: PokemonDataViewModel = await this.cacheService.get(name)
    if (cachedPokemonData) {
      return of(PokemonAdaptor.pokemonData(cachedPokemonData) as unknown as ResultViewModel<PokemonDataDto>);
    }
    return this.httpService
      .get(this.getApiUrl(`${name}`)).pipe(
        tap((data) => this.cacheService.set(name, data?.data)),
        map((data) => PokemonAdaptor.pokemonData(data?.data))
      );
  }
}