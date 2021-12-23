import React from 'react'
import './Wasm.css'
import * as wasm from "wasm";

function Wasm() {
  return (
    <div className='w-screen h-screen text-xl bg-orange-700 text-orange-200 p-2'>
      <p>Adding two ints, 2 and 3 = <b>{ wasm.add_two_ints(2, 3) }</b></p>
      <p>Fibonacci of 6 = <b>{ wasm.fib(6) }</b></p>
    </div>
  )
}

export default Wasm
