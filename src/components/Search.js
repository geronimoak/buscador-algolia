import React, { useEffect } from 'react';
import algoliasearch from 'algoliasearch'; // Asegúrate de usar la versión completa
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('76KVZN4JSK', '34ef67a4c561ce07e5b9b298abe2e2e2');

const Hit = ({ hit }) => (
  <div>
    <h4>{hit.Descripción}</h4>
    <p>Código: {hit.Código}</p>
    <p>Equivalencia: {hit.Equivalencia}</p>
    <p>Código Equivalente: {hit['Código_Equivalente']}</p>
    <p>Rubro: {hit.RUBRO}</p>
    <p>Cantidad Disponible: {hit['Cantidad disponible']}</p>
    {hit.IMAGEN && <img src={hit.IMAGEN} alt={hit.Descripción} width="100" />}
  </div>
);

const Search = () => {
  useEffect(() => {
    console.log('searchClient:', searchClient); // Para depuración
    const index = searchClient.initIndex('productos');
    index
      .search('')
      .then(({ hits }) => {
        console.log('Resultados de Algolia:', hits);
      })
      .catch(err => {
        console.error('Error al buscar en Algolia:', err);
      });
  }, []);

  return (
    <div>
      <h1>Buscador de Productos</h1>
      <InstantSearch searchClient={searchClient} indexName="productos">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
};

export default Search;