const Usuario = require('../models/Usuario');

 /*Los resolver son funciones
 que son responsable de retornar los valores
 que existen en el esquema*/
 const resulvers = {
    Query: {
        
    },
    Mutation: {
        //primero: root, es el resultado del type padre o del type padre
        //segundo: son los argumentos que se le pasa al valor
        //tercero: es el context es el objeto que se comparte en todo el resolver
        crearUsuario: async (_, {input}) => {
            const { email, password} = input;
            
            const existeUsuario = await Usuario.findOne({email});
            // console.log(existeUsuario);

            //si el usuario existe
            if(existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            } 
            
            try {
                const nuevoUsuario = new Usuario(input);
                console.log(nuevoUsuario);

                nuevoUsuario.save(); //Para guardar el registro
                
                //La funcion tiene que devolver un String porque asi se definio en schema
                return "Usuario Creado Correctamente";
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resulvers;