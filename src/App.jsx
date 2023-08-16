import * as React from 'react';
import CustomHook from './learn/custom_hooks';
import HookFlow from './learn/hook_flow';
import LiftingState from './learn/lifting_state';
import Game from './learn/tic_tac_toe';
import Tilt from './learn/vanilla_tilt';
import Pokemon from './learn/http_request';
import Counter from './learn/use_reducer';
/////////////////////////////
/////////////////////////////
/////////////////////////////
function App() {
  return (
    // <Tilt>
    //   <div className='totally-centered'>vanilla-tilt.js</div>
    // </Tilt>
    <Counter />
  );
}

export default App;
