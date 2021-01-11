const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    proyecto: {
        type: mongoose.SchemaType.Types.ObjectId,
        ref: 'Proyecto'
    },
    creador: {
        //ObjectId hace referencia al objeto del usuario, ver objeto en coompass
        //Ref: es la referencia en cual colleccion buscar el id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    estado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);
