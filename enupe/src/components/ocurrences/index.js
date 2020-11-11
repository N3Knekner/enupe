import React from 'react';
import OcurrenceCard from '../ocurrenceCard';
import Center from '../center'

class Ocurrences extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ocurrences: [
                { id: 123, title: "Mockup", gravity: 2, from: { userMatricula: 1234567, name: "Diretor" }, to: { group: false, userMatricula: 1234567890 } },
                { id: 135, title: "Mockup", gravity: 1, from: { userMatricula: 7654321, name: "Professor" }, to: { group: true, groupId: 555 } },
                { id: 101, title: "Mockup", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
                { id: 101, title: "Teste de overflow", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
                { id: 101, title: "Teste de overflow", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
                { id: 101, title: "Teste de overflow", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
                { id: 101, title: "Teste de overflow", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
                { id: 101, title: "Teste de overflow", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
                { id: 101, title: "Teste de overflow", gravity: 0, from: { userMatricula: 1234567890, name: "Você" }, to: { group: false, userMatricula: 7654321 } },
            ]
        };
    }
    render() { return <Center customcss="flex-1 justify-start max-w-25"> {this.state.ocurrences.map((e, i)=><OcurrenceCard ocurrence={e} key={i} />)} </Center>; }
}

export default Ocurrences;