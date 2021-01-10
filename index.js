const {ApolloServer} = require('apollo-server');

const typeDefs = require('./db/schema');
const resolvers = require('./db/resolver');

const conectarDB = require('./config/db');

//Conectar a la DB
conectarDB();

const server = new ApolloServer({typeDefs, resolvers});

// Listen retorna una promesa
server.listen().then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})