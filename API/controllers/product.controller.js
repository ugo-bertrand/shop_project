const db = require("../db.js");
const dateFile = require("../date.js");

exports.createProduct = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/products/addProduct).");
        return;
    }
    const product = {
        ...req.body
    };
    db.query("INSERT INTO products SET ?",product,(res,error) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/products/addProduct).");
            console.log(error);
            return;
        }
        if(!res){
            result.status(200).send({
                message:"Le produit avec le nom " + req.body.productName +  " existe déjà."
            });
            console.log(date + " : Le produit avec le nom : " + req.body.productName + " existe déjà (api/products/addProduct).");
            return;
        }
        result.status(200).send({
            message:"Le produit a bien été ajouter."
        });
        console.log(date + " : Le produit avec le nom " + req.body.productName + " a bien été ajouter (api/products/addProduct).");
        return;
    })
}

exports.findAll = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query("SELECT * FROM products",(res,error) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/products/).");
            console.log(error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            console.log(date + " : Les données ont bien été envoyer (api/products/).");
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de produits dans la base de données."
        });
        console.log(date + " : Il n'y a pas de produits dans la base de données (api/products/).");
        return;
    });
}

exports.updateById = (req,result) => {

}

exports.deleteById = (req,result) => {

}