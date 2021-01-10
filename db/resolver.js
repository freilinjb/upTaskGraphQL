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
        //primero: root, es el resultado del type padre o del type padre
        //segundo: son los argumentos que se le pasa al valor
        //tercero: es el context es el objeto que se comparte en todo el resolver
        //cuarto: informacion de info que es relevante
        // crearUsuario: (_,{input}, ctx) => {
        //     console.log('_:', _);
        //     console.log('input: ', input);
        //     console.log('ctx: ', ctx);
        //     console.log('Creando Usuario');
        // }
        crearUsuario: (_, {input}) => {
            const { nombre, password} = input;
            console.log(nombre);
            console.log(password );
            console.log('input: ', input);
            console.log('Creando Usuario');
        }
    }
}

module.exports = resulvers;