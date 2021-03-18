import React,{useState} from 'react';
import TrigonometricControls from './TrigonometricControls';
import ExponentialControls from './ExponentialControls';
import MisclControls from './MisclControls';
import './Controls.css'

const ClipObj=()=>{
    const [curControl,setCurControl]=useState('Trig');
    const handleClick=(e)=>{
        setCurControl(e.target.id);
    }
    return(
        <>
        <div className='controlsController'>
            <input type="button" value="Trigonometric" id="Trig" onClick={handleClick}/>
            {/* <input type="button" value="Exponential" id="Exp" onClick={handleClick}/> */}
            {/* <input type="button" value="Miscellaneous" id="Miscl" onClick={handleClick}/> */}
        </div>
    <div className='controlsContainer'>
        {curControl==='Trig'&&<TrigonometricControls></TrigonometricControls>}
        {curControl==='Exp'&&<ExponentialControls></ExponentialControls>}
        {curControl==='Miscl'&&<MisclControls></MisclControls>}
    </div>
    </>
    )
}

export default ClipObj;