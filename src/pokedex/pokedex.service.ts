import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PokedexService {
  constructor(private readonly httpService: HttpService) {}

  async getPokemon(name: string): Promise<any> {
    const POKEAPI_URL = `https://pokeapi.co/api/v2/pokemon`
    const { data } = await this.httpService.axiosRef.get(
      `${POKEAPI_URL}/${name}`,
    );

    return await data
  }
}