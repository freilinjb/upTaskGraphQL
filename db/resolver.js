const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

const bcrytjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

//Crear y firma un JWT
const crearToken = (usuario, secreta, expiresIn) => {
    // console.log('usuario: ', usuario);
    const { id, email, nombre } = usuario;

    //Firmamos el jwt
    return jwt.sign({id, email, nombre}, secreta, { expiresIn });
}

 /*Los resolver son funciones
 que son responsable de retornar los valores
 que existen en el esquema*/
 const resulvers = {
    Query: {
        obtenerProyectos: async (_, {}, ctx) => {
            const proyectos = await Proyecto.find({ creador: ctx.usuario.id});

            return proyectos;
        },
        obtenerTareas: async (_, {input}, ctx) => {
            // console.log(ctx);
            const tareas = await Tarea.find({creador: ctx.usuario.id}).where('proyecto').equals(input.proyecto);
            return tareas;
        }
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
                //Hashear password
                const salt = await bcrytjs.genSalt(10);
                input.password = await bcrytjs.hash(password, salt);

                // console.log(input);

                
                //Registrar nuevo usuario
                const nuevoUsuario = new Usuario(input);
                nuevoUsuario.save(); //Para guardar el registro
                
                //La funcion tiene que devolver un String porque asi se definio en schema
                return "Usuario Creado Correctamente";
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password} = input;

            //Si el usuario existe
            const existeUsuario = await Usuario.findOne({email});


            //Si el usuario no existe
            if(!existeUsuario) {
                throw new Error('El usuario no existe');
            } 

            //Si el password es correcto
            const passwordCorrecto = await bcrytjs.compare(password, existeUsuario.password);

            // console.log(passwordCorrecto);  true or false dependiendo si es correcto
            if(!passwordCorrecto) {
                throw new Error('Password Incorrecto');
            }

            //Dar acceso a la app
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '4hr')
            };

        },
        nuevoProyecto: async (_, { input }, ctx) => {
            console.log('DESDE EL RESOLVER ctx: ', ctx);

            try {
                const proyecto = new Proyecto(input);
                //Almacenarlo en la DB

                //Asocial el proyecto al creaado
                proyecto.creador = ctx.usuario.id;
                console.log('ctx: ', ctx);

                const resultado = await proyecto.save();

                return resultado;

            } catch (error) {
                console.log(error);
            }
        },
        actualizarProyecto: async (_, {id, input }, ctx) => {
            //Revisar que exista el proyecto
            let proyecto = await Proyecto.findById(id);

            if(!proyecto) {
                throw new Error('Proyecto no encontrado');
            }

            // console.log(proyecto);
            // console.log(typeof proyecto.creador); devuelve un objeto hay que convertirlo a String

            //Verificar que la persona que trata de editarlo, es el creador
            if(proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
            }

            //Guardar el proyecto
            proyecto = await Proyecto.findByIdAndUpdate({_id: id}, input, {new: true});
            //new: true, retorna el proyecto actualizado
            return proyecto;
        },
        eliminarProyecto: async (_, {id}, ctx) => {
            //Revisar que exista el proyecto
            let proyecto = await Proyecto.findById(id);

            if(!proyecto) {
                throw new Error('Proyecto no encontrado');
            }

            if(proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
            }

            //Eliminar
            await Proyecto.findOneAndDelete({_id: id});
            
            return "Proyecto Eliminado";
        },
        nuevaTarea: async (_, {input}, ctx) => {
            try {
                const tarea = new Tarea(input);
                tarea.creador = ctx.usuario.id;
                const resultado = await tarea.save();

                return resultado;

            } catch (error) {
                console.log(error);
            }
        },
        actualizarTarea: async (_, {id, input, estado}, ctx) => {
            //Si la tarea existe o no   
            let tarea = await Tarea.findById(id);

            if(!tarea) {
                throw new Error('Tarea no encontrada');
            }

            //Si la persona que edita es el creador
            if(tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
             }

            //Asignar estado
            input.estado = estado;

            //Guardar y retornar la tarea
            tarea = await Tarea.findOneAndUpdate({_id: id}, input, {new: true} );

            return tarea;
        },
        eliminarTarea: async (_, {id, input, estado}, ctx) => {
            //Si la tarea existe o no   
            let tarea = await Tarea.findById(id);

            if(!tarea) {
                throw new Error('Tarea no encontrada');
            }

            //Si la persona que edita es el creador
            if(tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
             }

             //Eliminar
             await Tarea.findOneAndDelete({_id: id});

             return "Tarea Eliminada";
        }
    }
}

module.exports = resulvers;