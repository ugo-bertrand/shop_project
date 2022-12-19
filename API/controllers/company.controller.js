const db = require("../db.js");
const dateFile = require("../date.js");

exports.createCompany = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/companies/addCompany).");
        return;
    }
    const company = {
        ...req.body
    };
    db.query("INSERT INTO companies SET ?",company,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/companies/addCompany).");
            console.log(error);
            return;
        }
        if(!res){
            result.status(200).send({
                message:"L'entreprise avec le nom : " + company.name + " existe déjà."
            });
            console.log(date + " : L'entreprise avec le nom : " + company.name + " existe déjà (api/companies/addCompany).");
            return;
        }
        result.status(200).send({
            message:"L'entreprise avec le nom : " + company.name + " a bien été ajouter."
        });
        console.log(date + " : L'entreprise avec le nom : " + company.name + " a bien été ajouter (api/companies/addCompany).");
        return;
    });
};

exports.findAll = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query("SELECT * FROM companies", (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/companies/).");
            console.log(error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            console.log(date + " : les données ont bien été envoyer (api/companies/).");
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas d'entreprises dans la base de données."
        });
        console.log(date + " : Il n'y a pas d'entreprises dans la base de données (api/companies/).");
        return;
    })
}

exports.updateById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/companies/update/:id).");
        return;
    }
    const company = {
        ...req.body
    }
    db.query(`UPDATE companies SET name = ${company.name}, place = ${company.place}, email = ${company.email} WHERE id = ${req.params.id}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/companies/update/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'entreprises avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas d'entreprises avec l'ID : " + req.params.id + " (api/companies/update/:id).");
            return;
        }
        result.status(200).send({
            message:"L'entreprise avec l'ID : " + req.params.id + " a bien été modifier." 
        });
        console.log(date + " : L'entreprise avec l'ID : " + req.params.id + " a bien été modifier (api/companies/update/:id).");
        return;
    }); 
};

exports.deleteById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`DELETE FROM companies WHERE id = ${req.params.id}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/companies/delete/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'entreprises avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas d'entreprises avec l'ID : " + req.params.id + " (api/companies/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"L'entreprise avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log("L'entreprise avec l'ID : " + req.params.id + " a bien été supprimer (api/companies/delete/:id).");
        return;
    });
};