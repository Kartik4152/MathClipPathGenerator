import React,{useState} from 'react';
import './TrigonometricControls.css';

const TrigonometricControls=()=>{
    const [controller,setController]=useState({
        step:{
            value:0.1,
            min:0.1,
            max:100,
            step:0.1
        },
        frequency:{
            value:1,
            min:0.1,
            max:1000,
            step:0.1
        },
        amplitude:{
            value:25,
            min:0.1,
            max:50,
            step:0.1
        },
        phase:{
            value:0,
            min:-360,
            max:360,
            step:0.5
        },
    })

    const makeClip=(e)=>{
    Math['sec']=(rad)=>{
        return 1/Math.cos(rad);
    }
    let points=[];
    let total=100/controller.step.value;
    let x=0;
    let deg=0;
    let phase=0;
    total++;
    while(total>0)
    {   
        //x*step goes from 0 to 100
        //so deg goes from 0 to 360
        deg=x*controller.step.value*3.6*Math.PI/180;
        phase=controller.phase.value*Math.PI/180;
        points.push([x*controller.step.value,50+controller.amplitude.value*Math[e.target.id](controller.frequency.value*deg+phase)]);
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
    const clickHandler=(e,name)=>{
        setController((prev)=>{
            if(e.target.value==='+')
                return {
                    ...prev,
                    [name]:{
                        ...(prev[name]),
                        value:((Number(prev[name]['value'])+prev[name]['step'])>prev[name]['max']?prev[name]['max']:Number(prev[name]['value'])+prev[name]['step']).toFixed(1)}
                };
            return {
                    ...prev,
                    [name]:{
                        ...(prev[name]),
                        value:((Number(prev[name]['value'])-prev[name]['step'])<prev[name]['min']?prev[name]['min']:Number(prev[name]['value'])-prev[name]['step']).toFixed(1)}
                };
        })
    }
    
    const changeHandler=(e)=>{
        setController((prev)=>{
            return({
                ...prev,
                [e.target.id]:{...prev[e.target.id],value:e.target.value},
            })
        }
        )
    }
    return(
        <>
        {/* Todo : Fix Button  Hold */}
        <div className='controlButtons'>
            <input type="button" value="Sin(x)" id="sin" onClick={makeClip}/>
            <input type="button" value="Tan(x)" id="tan" onClick={makeClip}/>
            <input type="button" value="Sec(x)" id="sec" onClick={makeClip}/>
        </div>
        <div className='controls'>
            <label htmlFor="step">Step size : {controller.step.value}%</label>
            <div>
                <input type="button" value="-" onClick={(e)=>clickHandler(e,'step')}/>
                <input type="range" name="step" id="step" min={controller.step.min} max={controller.step.step.max} step={controller.step.step} value={controller.step.value} onChange={changeHandler} />
                <input type="button" value="+" onClick={(e)=>clickHandler(e,'step')}/>
            </div>
            <label htmlFor="frequency">Frequency: {controller.frequency.value}hz</label>
            <div>
                <input type="button" value="-" onClick={(e)=>clickHandler(e,'frequency')}/>
                <input type="range" name="freqeuency" id="frequency" min={controller.frequency.min} max={controller.frequency.max} step={controller.frequency.step} value={controller.frequency.value} onChange={changeHandler} />
                <input type="button" value="+" onClick={(e)=>clickHandler(e,'frequency')}/>
            </div>
            <label htmlFor="amplitude">Amplitude : {controller.amplitude.value}</label>
            <div>
                <input type="button" value="-" onClick={(e)=>clickHandler(e,'amplitude')}/>
                <input type="range" name="amplitude" id="amplitude" min={controller.amplitude.min} max={controller.amplitude.max} step={controller.amplitude.step} value={controller.amplitude.value} onChange={changeHandler} />
                <input type="button" value="+" onClick={(e)=>clickHandler(e,'amplitude')}/>
            </div>
            <label htmlFor="phase">Phase Shift : {controller.phase.value}deg</label>
            <div>
                <input type="button" value="-" onClick={(e)=>clickHandler(e,'phase')}/>
                <input type="range" name="phase" id="phase" min={controller.phase.min} max={controller.phase.max} step={controller.phase.step} value={controller.phase.value} onChange={changeHandler} />
                <input type="button" value="+" onClick={(e)=>clickHandler(e,'phase')}/>
            </div>
        </div>
        </>
    )
}

export default TrigonometricControls;