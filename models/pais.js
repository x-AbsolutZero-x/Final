const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaisSchema = Schema({
    cp: {
        type: Number,
        required: true,
       unique:true
    },
    nombre: {
	type: String,
	required:true,
    },
    pob_total: {
	type: Number,
	required:true,
    },
    ext_territorial: {
        type: Number,
        required: true
    },
    capital: {
	type: String,
	required:true,
    }
});

module.exports = mongoose.model("Pais", PaisSchema);

/*Código postal, nombre, población total, extensión territorial, capital.*/
