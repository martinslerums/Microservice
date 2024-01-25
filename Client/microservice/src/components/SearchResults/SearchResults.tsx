import Table from 'react-bootstrap/Table';
import styles from './SearchResults.module.css';

type EndProduct = {
  title: string;
  description: string;
  final_price: number;
};

type SearchResultsProps = {
  products?: EndProduct[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null
};

const SearchResults = ({
  products, isLoading, isError, error,
}: SearchResultsProps) => (
    <div className={styles.searchResultsContainer}>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <>
          <p>Error loading results.</p>
          {error && <p>Error details: {error.message}</p>}
        </>
      )}
      {products && (
        <>
          <h2 className={styles.resultsHeader}>Search Results</h2>
          {products && products.length > 0 ? (
            <Table striped bordered hover responsive className={styles.resultsTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Name</th>
                  <th className={styles.tableHeader}>Description</th>
                  <th className={styles.tableHeader}>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: EndProduct) => (
                  <tr key={product.title}>
                    <td className={styles.tableCell}>{product.title}</td>
                    <td className={styles.tableCell}>{product.description}</td>
                    <td className={styles.tableCell}>{product.final_price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h3 className={styles.loadingMessage}>No results found.</h3>
          )}
        </>
      )}
    </div>
);

export default SearchResults;
