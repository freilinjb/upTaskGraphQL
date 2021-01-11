const { gql } = require('apollo-server');

// type Curso es el typeDefinition

//Datos de consulta
const typeDefs = gql`

    type Token {
        token: String
    }

    type Proyecto {
        nombre: String
        id: ID
    }

    type Tarea {
        nombre: String
        id: ID
        proyecto: String
        estado: Boolean
    }

    type Query {
        obtenerProyectos: [Proyecto]
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

    input TareaInput {
        nombre: String!
        proyecto: String!
    }

    
    type Mutation {
        #Proyectos
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: AutenticarInput ) : Token
        nuevoProyecto(input: ProyectoInput) : Proyecto
        actualizarProyecto(id : ID!, input: ProyectoInput) : Proyecto
        #id: ID! es para especificar reutilizar el proyecto Input y 
        #espesifica que se requiere el id del proyecto
        eliminarProyecto(id: ID!) : String

        #Tareas
        nuevaTarea(input: TareaInput) : Tarea
    }
`;


module.exports = typeDefs;
