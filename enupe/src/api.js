import axios from 'axios';

const url = process.env.NODE_ENV !== 'development' ? "http://fabricadetecnologias.ifc-riodosul.edu.br/equipe4/server" : "http://10.0.1.110:3333/equipe4/server";

export default axios.create({ baseUrl:url});