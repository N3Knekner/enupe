import React from 'react';

function L(props) {
    return <div className="flex flex-1 flex-col justify-center min-h-screen text-white bg-gradient-to-br from-teal-400 to-green-600">{props.children}</div>;
}

function R(props) {
    return <div className="flex flex-1 min-h-screen flex-col bg-gray-100 justify-center">{props.children}</div>;
}

export default {R,L};