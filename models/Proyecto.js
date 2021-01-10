const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
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
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
