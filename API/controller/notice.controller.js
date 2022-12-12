const db = require("../model/db.js");
const { findByCategoryName } = require("./category.controller.js");

// notice controller

//method to create a notice in the database
exports.createNotice = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message: "Le contenu ne doit pas être vide."
        });
        return;
    }
    const notice = {
        ...req.body
    };

    //display test
    console.dir(notice);
    db.query("insert into notices set ?",notice, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête"
            });
            console.log("Error : " + error);
            return;
        }
        if(!res){
            result.status(200).send({
                message:"Le post existe déjà."
            });
            return;
        }
        else{
            result.status(201).send({
                message: "L'entreprise a bien été créer."
            });
        }
    });
};

//method to return all notices in the database
exports.findAll = (req,result) =>{
    db.query("select * from notices",(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message: "Il n'y a pas de posts dans la base de données."
        });
        return;
    });
};

//method to return a notice based on its ID
exports.findById = (req,result) =>{
    db.query(`select * from notices where notices.id = ${req.params.id}`,(error,res) =>{
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
            message: "Il n'y a pas de posts avec l'ID : " + req.params.id
        });
        return;
    });
};

//method to return a notice based on its product
exports.findByProduct = (req,result) =>{
    db.query(`select * from notices join products on products.id = notices.productId where products.id = ${req.params.productId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête"
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            return;
        }
        result.status(404).send({
            message: "Il n'y a pas de posts avec le produit dont l'ID est : " + req.params.productId
        });
    });
};

//method to return a notice based on its user
exports.findByUser = (req,result) =>{
    db.query(`select * from notices join users on users.id = notices.userId where notices.userId = ${req.params.userId}`, (error,res)=>{
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
            message: "Il n'y a pas de posts de l'utilisateur avec l'ID " + req.params.userId
        });
        return;
    });
};

//method to update a notice 
exports.updateNoticeById = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide"
        });
        return;
    }
    const notices = {
        ...req.body
    };
    db.query(`update from notices set message = ${notices.message}, productId = ${notices.productId}, userId = ${notices.userId}, mark = ${notices.mark} where id = ${req.params.id}`,(error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête"
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de posts avec l'ID : " + req.params.id
            });
            return;
        }
        result.status(200).send({
            message:"Le post a bien été modifier"
        });
    });
};

//method to delete a notice
exports.deleteNoticeById = (req,result) =>{
    db.query(`delete from notices where id = ${req.params.id}`,(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0 ){
            result.status(404).send({
                message:"Il n'y a pas de posts avec cet ID : " + req.params.id
            });
            return;
        }
        result.status(200).send({
            message:"Le post a bien été supprimer"
        });
    });
};
