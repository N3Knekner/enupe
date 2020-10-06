import React from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class ModalAlert extends React.Component {
    constructor(props) {
        super();
    }
    render(){
        return (
            <Popup open={this.props.open} closeOnDocumentClick onClose={this.props.close}>
                <div className="modal">
                    <button className="close" onClick={this.props.close}>
                            &times;
                    </button>
                    <p>
                    {this.props.value}
                    </p>
                </div>
            </Popup>

        );
    }
}

export default ModalAlert;