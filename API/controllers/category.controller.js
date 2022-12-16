const db = require("../db.js");
const dateFile = require("../date.js");

exports.createCategory = (req,result) =>{
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer.");
        return;
    }
    const category = {
        ...req.body
    }
    db.query(`INSERT INTO categories SET ?`,category, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête.")
            console.log(error);
        }
        if(!res){
            result.status(200).send({
                message:"La categorie avec le nom : " + category.categoryName + " existe déjà."
            });
            console.log(date + " : La categorie avec le nom : " + category.categoryName + " existe déjà");
            return;
        }
        result.status(201).send({
            message:"La categorie avec le nom " + category.categoryName + " a bien été créer."
        });
        console.log("La categorie avec le nom " + category.categoryName + " a bien été créer.");
        return;
    });
};

exports.findAll = (req,result) =>{
    var date = dateFile.GetDate(new Date());
    db.query("SELECT * FROM categories", (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête. (api/categories/).");
            console.log(error);
        }
        if(res.length){
            result.status(200).send(res);
            console.log(date + " : Les données (categories) ont bien été envoyer (api/categories/).");
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de categories dans la base de données."
        });
        console.log(date + " : Il n'y a pas de categories dans la base de données (api/categories/).");
        return;

    });
};

exports.updateById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/categories/update/:id).")
        return;
    }

    const category = {
        ...req.body
    };

    db.query(`UPDATE categories SET categoryName = '${category.categoryName}' WHERE id = ${req.params.id}`,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lor de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/categories/delete/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de categories avec l'ID : " + req.params.id + "."
            });
            console.log(date + " : Il n'y a pas de categories avec l'ID : " + req.params.id + " (api/categories/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"La categorie avec l'ID : " + req.params.id + " a bien été modifier."
        });
        console.log(date + "La categorie avec l'ID : " + req.params.id + " a bien été modifier.");
        return;
    });
};

exports.deleteById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`DELETE FROM categories WHERE id = ${req.params.id}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/categories/delete/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de categories avec l'ID : " + req.params.id + "."
            });
            console.log(date + " : Il n'y a pas de categories avec l'ID : " + req.params + " (api/categories/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"La categorie avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log(date + " : La categorie avec l'ID : " + req.params.id + " a bien été supprimer (api/categories/delete/:id).");
        return;
    });
};