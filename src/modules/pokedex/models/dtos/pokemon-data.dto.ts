export interface PokemonDataDto {
  name: string;
  id: number;
  type: string;
  stats: {
    baseStat: number,
    name: string
  }[]
}