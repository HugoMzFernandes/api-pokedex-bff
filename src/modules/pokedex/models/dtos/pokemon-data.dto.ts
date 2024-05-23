/* istanbul ignore file */
export interface PokemonDataDto {
  name: string;
  id: number;
  type: {
    typeName: string
  }[];
  stats: {
    baseStat: number,
    name: string,
  }[];
  imageUrl: string;
}