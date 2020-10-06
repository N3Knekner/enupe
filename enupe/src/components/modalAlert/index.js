import React from 'react';
import { Popup } from 'reactjs-popup';

class ModalAlert extends React.Component {
    constructor(props) {
        super();
    }
    render(){
        return (
            <Popup open={this.props.open} closeOnDocumentClick onClose={this.props.close}>
                <div className="p-5">
                    {this.props.value}
                    <hr className="my-5"/>
                    <div className="flex flex-col md:flex-row justify-around">
                        <button className="bg-blue-500 hover:bg-blue-700 mb-5 md:mb-0 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" onClick={() => { this.props.close(); this.props.onConfirm()}}>Confirmar</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" onClick={this.props.close}>Cancelar</button>
                    </div>
                </div>
            </Popup>

        );
    }
}

export default ModalAlert;