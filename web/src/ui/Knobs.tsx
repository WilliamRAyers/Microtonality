import { Component, useState } from 'react';

interface KnobProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  minAngle: number;
  maxAngle: number;
  className: string;
  knobLabel: string;
}

const defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  minAngle: 30,
  maxAngle: 330,
  className: "w-96",
  knobLabel: "Label"
}

export default function Knob (props: KnobProps) {
  let [value, setValue] = useState<number>(props.value);


  const valueToAngle = (value: number) => {
    const range = props.max - props.min;
    const percent = (value - props.min) / range;
    const angle = percent * (props.maxAngle - props.minAngle) + props.minAngle;
    return angle-180;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { movementX, movementY } = event;
    console.log("x" + movementX);
    console.log("y" + movementY);
    setValue((prevValue) =>{
      return Math.min(props.max, Math.max(movementX + movementY + prevValue, props.min))
    });
    props.onChange(value);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(event.target.value);
    if (val > 100) val = 100;
    setValue(val)
  }

    return (
      <div className={`flex flex-col justify-center items-center ${props.className}`}>
        <input className={"text-center self-center w-1/4 rounded-md font-agrandir"} type="number" value={value} onChange={handleInput} min={0} max={100} />
        <div className={"aspect-square rounded-full p-2 bg-gradient-to-b from-neutral-500 to-neutral-900 flex mt-[4%] w-1/2"} onMouseDown={handleMouseDown}>
          <div className={"w-full h-full rounded-full p-0.5 bg-gradient-to-b from-stone-700 to-neutral-800 flex-1"} >
            <div style={{transform: `rotate(${valueToAngle(value)}deg)`}} className={"w-full h-full flex items-start justify-center"}>
              <div className={"w-2.5 h-2.5 rounded-full bg-black"}>
              </div>
            </div>
          </div>
        
      </div>

      <a className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal text-center text-white">{props.knobLabel}</a>
      
      </div>
    );
  
}

Knob.defaultProps = defaultProps;