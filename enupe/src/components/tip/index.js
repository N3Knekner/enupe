import React from 'react';
import { Popup } from 'reactjs-popup';

function Tip(props) {
  return (
      <Popup trigger={open => (<span className="cursor-pointer select-none mx-2 px-3 rounded-full border border-gray-600 hover:shadow">?</span>)}
            position={props.direction + ' center'} 
          closeOnDocumentClick>
          <span className="text-sm">{props.tip}</span>
      </Popup>
  );
}

export default Tip;