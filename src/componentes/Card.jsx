import React, { useEffect, useState } from 'react';
import '../css/estilos.css';

function Card(props) {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=35';

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(url);
      const json = await response.json();

      const pokemonDataList = await Promise.all(
        json.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return pokemonData;
        })
      );

      setPokemonList(pokemonDataList);
      setIsLoading(false);
    };

    fetchApi();
  }, []);

  if (isLoading) {
    return <div>Cargando.....</div>;
  }

  return (
    <div className='Fondos'>
      {pokemonList.map((pokemon) => (
        <div className='contenedorTexto' key={pokemon.name}>
          <img
            className='contenedorImagen'
            src={pokemon.sprites.front_default}
            alt='imagen'
          />
          <h5 className='contenedorTitulo'>{pokemon.name}</h5>
          <p className='contenedorParrafo'>{pokemon.types[0].type.name}</p>
          <p className='contenedorParrafo'>{(pokemon.weight/2.2046).toFixed(1)}kg.</p>
          <p className='contenedorParrafo'>{((pokemon.height)*0.3048).toFixed(1)}m.</p>
          <p className='contenedorParrafo'>{pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p> 
        
        </div>
      ))}
    </div>
  );
}

export default Card;