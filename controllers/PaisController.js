var Pais = require('../models/pais');
var debug = require('debug')('blog:pais_controller');

// Obtener uno
module.exports.getOne = (req, res, next) => {
    debug("Search Pais", req.params);
    Pais.findOne({
            cp: req.params.cp
        }, "-nombre -capital")
        .then((foundPais) => {
            if (foundPais)
                return res.status(200).json(foundPais);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}
// Obtener todos by10
module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Pais List",{size:perPage,page, sortby:sortProperty,sort});

    Pais.find({}, "-nombre -capital")
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((pais) => {
           return res.status(200).json(pais) /*pais.js*/
        }).catch(err => {
            next(err);
        })

}

// Insertar uno

module.exports.register = (req, res, next) => {
    debug("New Pais", {
        body: req.body
    });
    Pais.findOne({
            cp: req.body.cp
        }, "-nombre -capital")
        .then((foundPais) => {
            if (foundPais) {
                debug("Pais duplicado");
                throw new Error(`Pais duplicado ${req.body.cp}`);
            } else {
                let newPais = new Pais({
                    cp: req.body.cp,
                    nombre: req.body.nombre ,
                    pob_total: req.body.pob_total || "",
                    ext_territorial: req.body.ext_territorial || "",
                    capital: req.body.capital /*TODO: Modificar, hacer hash del password*/
                });
                return newPais.save(); // Retornamos la promesa para poder concater una sola linea de then
            }
        }).then(pais => { 
            return res
                .header('Location', '/pais/' + pais._id)
                .status(201)
                .json({
                    _id: pais._id
                });
        }).catch(err => {
            next(err);
        });
}

// Actualizar uno 

module.exports.update = (req, res, next) => {
    debug("Update pais", {
        cp: req.params.cp,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Pais.findOneAndUpdate({
            cp: req.params.cp
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}


//Eliminar uno

module.exports.delete = (req, res, next) => {

    debug("Delete pais", {
        cp: req.params.cp,
    });

    Pais.findOneAndDelete({cp: req.params.cp})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}
