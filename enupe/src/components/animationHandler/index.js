import React from 'react';

class AnimationHandler extends React.Component{
    constructor(props){
        super();
        props.onStart();
        this.state = { timedout:false};
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({ timedout: true }, this.props.onTimeout()),
            this.props.timeout
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
        this.props.callback();
    }

    render(){
        return this.props.children;
    }
}

export default AnimationHandler;