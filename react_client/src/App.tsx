import React, { useState } from 'react';
import './App.css';

import WasmGameOfLife from './components/WasmGameOfLife';

function App() {

  return (
    <div className='w-screen h-screen bg-slate-600 text-white'>
      <WasmGameOfLife></WasmGameOfLife>
    </div>
  );
}

export default App;
