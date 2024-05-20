import { Controller, Get, Param } from "@nestjs/common";
import { PokedexService } from "./pokedex.service"

@Controller('getPokemonByName')
export class PokedexController {
  constructor(private readonly service: PokedexService) {}

  @Get('/:name')
  async getPokemon(@Param('name') name: string): Promise<string> {
    return await this.service.getPokemon(name);
  }
}