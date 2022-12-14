const db = require("../model/db.js");

//product controller

//method to create a product in the database
exports.createProduct = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide"
        });
    }
    const product = {
        ...req.body
    };
    db.query(`insert into products set ?`,product,(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(!res){
            result.status(200).send({
                message:"Le produit existe déjà."
            });
            return;
        }
        else{
            result.status(201).send({
                message:"Le produit a été créer."
            });
            return;
        }
    });
};

//method to return all product in the database
exports.findAll = (req,result) =>{
    db.query("select * from products",(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de produits dans la base de données."
        });
        return;
    });
};

//method to return a product based on its ID
exports.findById = (req,result) =>{
    db.query(`select * from products where id = ${req.params.id}`,(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de produits avec l'ID : " + req.params.id
        });
    });
};

//method to return a product based on its name
exports.findByName = (req,result) =>{
    db.query(`select * from products where productName = ${req.params.name}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message: "Il n'y a pas de produits avec le nom : " + req.params.name
        });
        return;
    });
};

//method to return a product based on its price
exports.findByPrice = (req,result) =>{
    db.query(`select * from products where price = ${req.params.price}`, (error,res) => {
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de produits avec ce prix : " + req.params.price
        });
    });
};

//method to return a product based on its company,
exports.findByCompany = (req,result) =>{
    db.query(`select * from products join companies on products.companyId = companies.id where companies.name = ${req.params.companyName}`,(error,res)=> {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de produits pour cette entreprise : " + req.params.companyName
        });
        return;
    });
};

//method to return a product based on its category
exports.findByCategory = (req,result) =>{
    db.query(`select * from products join categories on categories.id = products.categoryId where categories.name = ${req.params.categoryName}`,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de produits dans la catégories : " + req.params.categoryName
        });
    });
};

//method to update a product
exports.updateProductById = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        return;
    }
    const product = {
        ...req.body
    }
    db.query(`update from products set productName = ${product.productName}, price = ${product.price}, description = ${product.description}, companyId = ${product.companyId}, categoryId = ${product.categoryId} where id = ${req.params.productId}`,(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de produits avec l'ID : " + req.params.productId + " ."
            });
            return;
        }
        result.status(200).send({
            message:"Le produit a bien été modifier."
        })
    })
}

//method to delete a product
exports.deleteProductById = (req,result) =>{
    db.query(`delete from products where id = ${req.params.productId}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de produits avec l'ID : " + req.params.productId + " ."
            });
            return;
        }
        result.status(200).send({
            message:"Le produit a bien été modifier."
        });
    });
};