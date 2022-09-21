import { act, renderHook } from '@testing-library/react-hooks';
import { useUrlForm } from '../components/url-form/hooks/use-url-form';


test('invalid url will not make api requests', async () => {
    const mockApiRequest = jest.fn();
    const hook = renderHook(() =>
      useUrlForm({
        getShortenedUrl: mockApiRequest,
      }),
    );
  
    act(() => {
      hook.result.current.setUrlToBeShortened('123');
    });
    await act(async () => {
        await hook.result.current.onSubmitUrl();
      });
    expect(hook.result.current.urlToBeShortened).toEqual('123');
    expect(mockApiRequest).toHaveBeenCalledTimes(0);
  });

  test('valid url will make api requests', async () => {
    const mockApiRequest = jest.fn();
    mockApiRequest.mockResolvedValue({
        url: 'https://stackoverflow.com/questions/45168803/jestjs-trying-to-mock-async-await-in-node-js-tests', 
        hash: '123456'
    });

    const hook = renderHook(() =>
      useUrlForm({
        getShortenedUrl: mockApiRequest,
      }),
    );
  
    act(() => {
      hook.result.current.setUrlToBeShortened('https://stackoverflow.com/questions/45168803/jestjs-trying-to-mock-async-await-in-node-js-tests');
    });
    
    await act(async () => {
        await hook.result.current.onSubmitUrl();
      });

    expect(hook.result.current.urlToBeShortened).toEqual('https://stackoverflow.com/questions/45168803/jestjs-trying-to-mock-async-await-in-node-js-tests');
    expect(hook.result.current.shortenedUrl).toEqual('123456');
    expect(mockApiRequest).toHaveBeenCalledTimes(1);
  });
