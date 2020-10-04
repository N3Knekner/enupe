import React from 'react';

class AnimationHandler extends React.Component{
    constructor(props){
        super();
        props.onConstruct();
    }

    componentDidMount() {
        this.offsetID = setInterval(
            () => this.props.onStart(),
            this.props.offset
        );
        this.timerID = setInterval(
            () => this.props.onTimeout(),
            this.props.timeout + this.props.offset
        );
    }
    componentWillUnmount() {
        clearInterval(this.offsetID);
        clearInterval(this.timerID);
        this.props.callback();
    }

    render(){
        return this.props.children;
    }
}

export default AnimationHandler;