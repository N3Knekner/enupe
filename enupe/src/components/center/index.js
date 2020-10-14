import React from 'react';

const Center = React.forwardRef((props,ref) =>{
    return (
        <div className="flex flex-row w-full justify-center">
            <div className={"flex flex-col justify-center " + props.customcss} ref={ref}>{props.children}</div>
        </div>
    );
})

export default Center;