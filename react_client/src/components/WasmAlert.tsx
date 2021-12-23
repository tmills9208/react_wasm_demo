import React, { useState } from 'react';

import { greet } from 'wasm-game-of-life';

function WasmAlert() {

  const [name, setName] = useState<string>('Tyler');

  // thank you for the right event type to use https://blaipratdesaba.com/react-typescript-cheatsheet-form-elements-and-onchange-event-types-8c2baf03230c
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setName(e.target.value);

  return (
    <div>
      <button onClick={() => greet(name)} className='m-2 bg-gray-200 text-black p-2 px-3 rounded-full'>
        Hello!
      </button>
      <input type="text" value={name} onChange={onNameChange} className='m-2 bg-gray-200 text-black p-2 px-3 rounded-full' />
    </div>
  )
}

export default WasmAlert
