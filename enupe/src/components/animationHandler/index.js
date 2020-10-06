import React from 'react';

class AnimationHandler extends React.Component{
    constructor(props){
        super();
        props.onConstruct();
    }

    componentDidMount() {
        this.offsetID = setTimeout(
            () => this.props.onStart(),
            this.props.offset
        );
        this.timerID = setTimeout(
            () => this.props.onTimeout(),
            this.props.timeout + this.props.offset
        );
    }
    componentWillUnmount() {
        clearTimeout(this.offsetID);
        clearTimeout(this.timerID);
        this.props.callback();
    }

    render(){
        return this.props.children;
    }
}

export default AnimationHandler;