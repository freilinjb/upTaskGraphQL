const { gql } = require('apollo-server');

// type Curso es el typeDefinition

//Datos de consulta
const typeDefs = gql`
    
    type Curso {
        titulo: String
        tecnologia: String
    }

    type Tecnologia {
        tecnologia: String
    }

    
    type Token {
        token: String
    }

    type Proyecto {
        nombre: String
        id: ID
    }

    type Query {
        obtenerTecnologia: [Tecnologia]
    }

    input UsuarioInput {
        nombre: String!,
        email: String!,
        password: String!
    }

    input AutenticarInput {
        email: String!,
        password: String!
    }

    input ProyectoInput {
        nombre: String!
    }

    
    type Mutation {
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: AutenticarInput ) : Token
        nuevoProyecto(input: ProyectoInput) : Proyecto
        actualizarProyecto(id : ID!, input: ProyectoInput) : Proyecto
        #id: ID! es para especificar reutilizar el proyecto Input y espesifica que se requiere el id del proyecto
    }
`;


module.exports = typeDefs;
