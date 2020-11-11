import React,{ useState } from 'react';

function OcurrenceCard(props) {
  const o = props.ocurrence;
  const alertColor = [["gray-200", "gray-500"], ["yellow-500", "yellow-700"], ["red-500", "red-700"]];
  const [ open, setOpen ] = useState(false);

  return (
    <div className="flex-initial flex-col m-4 bg-white rounded shadow text-gray-900">
      <div className={"from-" + alertColor[o.gravity][0] + " to-" + alertColor[o.gravity][1] + " rounded-t flex flex-row justify-between p-2 bg-gradient-to-r"}>
        <h2>{o.title}</h2>
        <span className="text-white">de: {o.from.name}</span>
      </div>
      <div className={"p-4 flex-col transition duration-500 ease-in-out min-h-1 focus:min-h-24 " + (open ? "flex" : "hidden")}>
        {Object.keys(props.ocurrence).map((e, i) => <p key={i}> {e.toString() + " = " + props.ocurrence[e]} </p>)}
      </div>
      <span onClick={() => setOpen(!open)} className="cursor-pointer flex flex-row justify-center text-gray-600 p-2">{open?"Minimizar":"Expandir"}</span>
    </div>
  );
}

export default OcurrenceCard;