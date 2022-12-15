const db = require("../db.js");

exports.createCategory = (req,result) =>{
    const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(display + " : Le contenu est vide la requête ne peut pas être envoyer.");
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
            console.log(display + " : Une erreur est survenue lors de l'envoie de la requête.")
            console.log(error);
        }
        if(!res){
            result.status(200).send({
                message:"La categorie avec le nom : " + category.categoryName + " existe déjà."
            });
            console.log(display + " : La categorie avec le nom : " + category.categoryName + " existe déjà");
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
    const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    db.query("SELECT * FROM categories", (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(display + " : Une erreur est survenue lors de l'envoie de la requête. (api/categories/)");
            console.log(error);
        }
        if(res.length){
            result.status(200).send(res);
        }
        result.status(404).send({
            message:"Il n'y a pas de categories dans la base de données."
        });
    });
};