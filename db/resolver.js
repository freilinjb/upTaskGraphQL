var cursos = [
    {
        titulo: "Hola mundo", tecnologia: "Hola 2"
    },
    {
        titulo: "Hola mundo", tecnologia: "Hola 2"
    },
    {
        titulo: "Hola mundo", tecnologia: "Hola 2"
    },
    {
        titulo: "Hola mundo", tecnologia: "Hola 2"
    },
];


 /*Los resolver son funciones
 que son responsable de retornar los valores
 que existen en el esquema*/
 const resulvers = {
    Query: {
        obtenerCursos: () => cursos,
        obtenerTecnologia: () => cursos
    },
    Mutation: {
        crearUsuario: () => {
            console.log('Creando Usuario');
        }
    }
}

module.exports = resulvers;