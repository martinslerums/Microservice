import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import SearchForm from './components/SearchForm/SearchForm.tsx';
import SearchResults from './components/SearchResults/SearchResults.tsx';
import useGetProducts from './components/SearchForm/Hooks/useGetProducts.tsx';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearch, setLastSearch] = useState({ query: '', page: '' });

  const {
    data, isLoading, isError, error,
  } = useGetProducts(lastSearch);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  return (
    <div className="container">
    <SearchForm
        onSubmit={(payload) => {
          setLastSearch(payload);
        }}
    />
    <SearchResults
       products={searchResults}
       isLoading={isLoading}
       isError={isError}
       error={error}
    />
  </div>
  );
};

export default App;
