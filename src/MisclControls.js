import React,{useState} from 'react';
import './TrigonometricControls.css';

const TrigonometricControls=()=>{
    const [controller,setController]=useState({
        step:0.1,
        frequency:1,
        amplitude:25,
        phase:0
    })
    const makeClip=(e)=>{
    Math['sec']=(rad)=>{
        return 1/Math.cos(rad);
    }
    let points=[];
    let total=100/controller.step;
    let x=0;
    let deg=0;
    let phase=0;
    total++;
    while(total>0)
    {   
        //x*step goes from 0 to 100
        deg=x*controller.step*3.6*Math.PI/180;
        phase=controller.phase*Math.PI/180;
        points.push([x*controller.step,50+controller.amplitude*Math[e.target.id](controller.frequency*deg+phase)]);
        x++;
        total--;
    }
    let clipString="polygon(";
    for(let point of points)
    {
        clipString+=`${point[0]}% ${point[1]}%, `;
    }
    clipString+="100% 100%, 0% 100%)";
    document.querySelector('.clipThis').style.clipPath=clipString;
    }
    
    const changeHandler=(e)=>{
        setController((prev)=>{
            return({
                ...prev,
                [e.target.id]:e.target.value,
            })
        }
        )
    }
    return(
        <>
        <div className='controlButtons'>
            <input type="button" value="Manik(x)" id="sin" onClick={makeClip}/>
            <input type="button" value="Tan(x)" id="tan" onClick={makeClip}/>
            <input type="button" value="Sec(x)" id="sec" onClick={makeClip}/>
        </div>
        <div className='controls'>
            <label htmlFor="step">Step size : {controller.step}%</label>
            <input type="range" name="step" id="step" min={0.1} max={100} step={0.1} value={controller.step} onChange={changeHandler} />
            <label htmlFor="frequency">Frequency: {controller.frequency}hz</label>
            <input type="range" name="freqeuency" id="frequency" min={0.1} max={1000} step={0.1} value={controller.frequency} onChange={changeHandler} />
            <label htmlFor="amplitude">Amplitude : {controller.amplitude}</label>
            <input type="range" name="amplitude" id="amplitude" min={0.1} max={50} step={0.1} value={controller.amplitude} onChange={changeHandler} />
            <label htmlFor="phase">Phase Shift : {controller.phase}deg</label>
            <input type="range" name="phase" id="phase" min={-360} max={360} step={0.5} value={controller.phase} onChange={changeHandler} />
        </div>
        </>
    )
}

export default TrigonometricControls;