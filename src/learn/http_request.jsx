import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
  fetchPokemon,
} from './pokemon_form';

/////////////////////////////
/////////////////////////////
/////////////////////////////
function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  });

  const { status, pokemon, error } = state;

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({ status: 'pending' });

    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({ pokemon, status: 'resolved' });
      },
      error => {
        setState({ error, status: 'rejected' });
      },
    );
  }, [pokemonName]);

  if (status === 'idle') {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    // this will be handled by ErrorBoundary
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }

  throw new Error('this should be impossible');
}

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message} </pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Pokemon() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className='pokemon-info-app'>
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className='pokemon-info'>
        <ErrorBoundary
          FallbackComponent={ErrorFallBack}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
export default Pokemon;
