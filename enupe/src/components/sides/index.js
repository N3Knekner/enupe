import React from 'react';

function L(props) {
    return <div id="left"  className={"flex flex-1 flex-" + (props.isHeader ? "row header h-16" :"col half")+" justify-center text-white bg-gradient-to-br from-teal-400 to-green-600"}>{props.children}</div>;
}

function R(props) {
    return <div id="right" className={"flex flex-1 flex-col " + (props.isBody ? "body" : "half") +" bg-gray-100 justify-center"}>{props.children}</div>;
}

export default {R,L};