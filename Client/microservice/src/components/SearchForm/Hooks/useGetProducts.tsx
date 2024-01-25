import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SearchFormValues } from '../SearchForm.tsx';

const useGetProducts = (searchForm: SearchFormValues) => useQuery({
  queryKey: ['products', searchForm],
  queryFn: () => axios.get(`http://localhost:3000/products?query=${searchForm.query}&page=${searchForm.page}`)
    .then((response: AxiosResponse) => response.data),
  staleTime: 60000,
  cacheTime: 0,
});

export default useGetProducts;
