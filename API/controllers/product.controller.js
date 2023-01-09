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
    db.query("SELECT * FROM products",(error,res) => {
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
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/products/update/:id).");
        return;
    }
    const product = {
        ...req.body
    }
    db.query(`UPDATE products SET productName = '${product.productName}', price = ${product.price}, description = ${product.description},
     companyId = ${product.companyId}, categoryId = ${product.categoryId} WHERE id = ${req.params.id}`,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/produts/update/:id)");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de produits avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas de produits avec l'ID : " + req.params.id + " (api/products/update/:id).");
            return;
        }
        result.status(200).send({
            message:"Le produit avec l'ID : " + req.params.id + " a bien été modifier."
        });
        console.log(date + " : Le produit avec l'ID : " + req.params.id + " a bien été modifier (api/products/update/:id).");
        return;
     });
};

exports.deleteById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`DELETE FROM products WHERE id = ${req.params.id}`,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/products/delete/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de produits avec l'ID :" + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas de produits avec l'ID : " + req.params.id + " (api/products/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"Le produit avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log(date + " : Le produit avec l'ID : " + req.params.id + " a bien été supprimer (api/products/delete/:id).");
        return;
    })
}