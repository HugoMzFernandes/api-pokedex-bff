import { Module } from '@nestjs/common';
import { PokedexModule } from './modules/pokedex/pokedex.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PokedexModule,
  ],
})
export class AppModule {}
