import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { catchError } from "rxjs";
import { errorResponseHelper } from "src/shared";

import { PokedexService } from "./pokedex.service"

@ApiTags('Pokemon API')
@Controller('v1/getPokemonByName')
export class PokedexController {
  constructor(private readonly pokedexService: PokedexService) {}

  @Get('/:name')
  getPokemonByNameData(@Param('name') name: string) {
    return this.pokedexService
      .getPokemonByNameData(name)
      .pipe(catchError(errorResponseHelper));
  }
}