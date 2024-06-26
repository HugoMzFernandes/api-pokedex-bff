/* istanbul ignore file */
export interface PokemonDataViewModel {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: any;
  forms: any ;
  game_indices: any;
  held_items: any;
  location_area_encounters: string;
  moves: any;
  past_types: any;
  sprites: any;
  cries: any;
  species: any;
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}
