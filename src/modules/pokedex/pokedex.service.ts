import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/services/base.service";
import { Observable, map } from "rxjs";
import { ResultViewModel } from "src/shared";
import { PokemonAdaptor } from "./adaptors/pokemon-data.adaptor";
import { PokemonDataDto } from "./models";

@Injectable()
export class PokedexService extends BaseService {
  constructor(private readonly httpService: HttpService) {
    super('https://pokeapi.co/api/v2/pokemon')
  }

  getPokemonByNameData(name: string): Observable<ResultViewModel<PokemonDataDto>> {
    return this.httpService
      .get(this.getApiUrl(`${name}`))
      .pipe(map((data) => PokemonAdaptor.pokemonData(data?.data)))
  }
}