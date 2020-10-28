import axios from 'axios';

const url = process.env.NODE_ENV !== 'development' ? "http://fabricadetecnologias.ifc-riodosul.edu.br/equipe4/server" : "http://localhost:3333/server";

export default axios.create({ baseUrl:url});