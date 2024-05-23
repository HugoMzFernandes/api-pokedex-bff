
import { errorResponseHelper } from '../../src/shared/helpers';
import { ResultViewModel } from '../../src/shared';
import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

describe('errorResponseHelper', () => {
  it('should transform AxiosError to HttpException with result structure', () => {
    const mockError: AxiosError = {
      message: 'Network Error',
      response: {
        data: { message: 'API server error' },
        status: 503,
        statusText: '',
        headers: undefined,
        config: undefined
      },
      isAxiosError: false,
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      name: ''
    };

    const expectedResult: ResultViewModel<null> = {
      data: null,
      error: { message: 'API server error' },
      status: 503,
      message: 'Network Error',
    };

    try {
      errorResponseHelper(mockError);
      fail('Expected HttpException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toEqual(expectedResult.status);
      expect(error.response).toEqual(expectedResult);
    }
  });
});