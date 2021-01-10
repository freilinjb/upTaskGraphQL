const { ApolloServer } = require("apollo-server");
const jwt = require('jsonwebtoken');
require('dotenv').config('variables.env');

const typeDefs = require("./db/schema");
const resolvers = require("./db/resolver");

const conectarDB = require("./config/db");


//Conectar a la DB
conectarDB();

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    /*context es una funcion que estara presente
    en todos los resolver y funciona y igual que el req y el res de nodejs
    */
    context: ({req}) => {
        const token = req.headers['autorization'] || '';
        // console.log(req.headers);
        // console.log('token: ', token);
        if(token) {
            try {
                const usuario = jwt.varify(token, process.env.SECRETA);
                console.log('usuario: ', usuario);

            } catch (error) {
                console.log(error);
            }
        }
    }
 });

// Listen retorna una promesa
server.listen().then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
