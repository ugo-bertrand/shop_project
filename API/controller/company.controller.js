const db = require("../model/db.js");

//company controller

//method to create a company in the database
exports.createCompany = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide"
        });
        return;
    }
    const company = {
        ...req.body
    };
    db.query("insert into companies set ?",company,(error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(!res){
            result.status(200).send({
                message:"L'entreprise existe déjà."
            });
            return;
        }
        else{
            result.status(201).send({
                message:"L'entreprise a bien été créer."
            });
        }
    });
};

//method to return all companies in the database
exports.findAll = (req,result) =>{
    db.query("select * from companies",(error,res) =>{
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
            message:"Il n'y a pas d'entreprises dans la base de données."
        });
        return;
    });
};

//method to return a company based on its ID
exports.findById = (req,result) =>{
    db.query(`select * from companies where companies.id = ${req.params.companyId}`,(error,res) =>{
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
            message:"Il n'y a pas d'entreprise avec l'ID " + req.params.companyId
        });
    });
};

//method to return a company based on its name
exports.findByName = (req,result) => {
    db.query(`select * from companies where companies.name = ${req.params.companyName}`,(error,res) =>{
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
            message: "Il n'y a pas d'entreprises avec le nom " + req.params.companyName
        });
    });
};

//method to return companies based on its place
exports.findByPlace = (res,result) =>{
    db.query(`select * from companies where companies.place = ${req.params.place}`,(error,res) =>{
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
            message:"Il n'y a pas d'entreprises qui sont situé à " + req.params.place
        });
        return;
    });
};

//method to return company bases on its email
exports.findByEmail = (req,result) =>{
    db.query(`select * from companies where companies.email = ${req.params.email}`, (error,res) =>{
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
            message: "Il n'y a pas d'entreprises avec cet email " + req.params.email
        });
        return;
    });
};

//method to change the company's information
exports.updateCompanyById = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide"
        });
        return;
    }
    const company = {
        ...req.body
    };
    db.query(`update from companies set name = ${company.name}, place = ${company.place}, email = ${company.email} where id = ${req.params.companyId}`
    , (error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'entreprise avec l'ID " + req.params.companyId
            });
            return;
        }
        result.status(200).send({
            message:"L'entreprise a bien été modifier"
        });
    });
};

//method to delete a company
exports.deleteById = (req,result) =>{
    db.query(`delete from companies where id = ${req.params.companyId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'entreprise avec l'ID " + req.params.companyId
            });
            return;
        }
        result.status(200).send({
            message:"L'entreprise a bien été supprimer."
        });
    });
};