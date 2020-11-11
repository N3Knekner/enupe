import React from 'react';

function OcurrenceCard(props) {
  return <div className="m-4 bg-white rounded shadow p-4">{Object.keys(props.ocurrence).map((e) => <p> {e.toString() + " = " + props.ocurrence[e]} </p>)}</div>;
}

export default OcurrenceCard;