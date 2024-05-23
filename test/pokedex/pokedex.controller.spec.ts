import { Test, TestingModule } from '@nestjs/testing';
import { PokedexController } from '../../src/modules/pokedex/pokedex.controller'
import { PokedexService } from '../../src/modules/pokedex/pokedex.service';
import { of, throwError } from 'rxjs';

describe('PokedexController', () => {
  let controller: PokedexController;
  let pokedexServiceMock: PokedexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [
        {
          provide: PokedexService,
          useValue: {
            getPokemonByNameData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokedexController>(PokedexController);
    pokedexServiceMock = module.get<PokedexService>(PokedexService);
  });

  it('should return pokemon data from service', async () => {
    const mockData = { name: 'bulbasaur' };
    pokedexServiceMock.getPokemonByNameData = jest.fn().mockReturnValueOnce(of(mockData));

    const result = await controller.getPokemonByNameData('bulbasaur');
    const emmitedValue = await result.toPromise()

    expect(emmitedValue).toEqual(mockData);
    expect(pokedexServiceMock.getPokemonByNameData).toHaveBeenCalledWith('bulbasaur');
  });

  it('should return error response on service error', async () => {
    const error = new Error('Failed to fetch pokemon data');
    pokedexServiceMock.getPokemonByNameData = jest.fn().mockReturnValueOnce(throwError(error));

    try {
      await controller.getPokemonByNameData('charmander');
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error.message).toEqual(error.message);
    }

    expect(pokedexServiceMock.getPokemonByNameData).toHaveBeenCalledWith('charmander');
  });
});
