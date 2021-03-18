import React from 'react';
import ClipObj from './ClipObj'
import Controls from './Controls'
import './App.css'

const App=()=>{
    return(
<div className='container'>
    <h1>Math Function Clip Generator</h1>
    <ClipObj></ClipObj>
    <Controls></Controls>
</div>
)
}

export default App;