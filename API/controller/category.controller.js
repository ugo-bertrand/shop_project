const { resume } = require("../model/db.js");
const db = require("../model/db.js");

//category controller

//method to create a category in the database
exports.createCategory = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message: "Le contenu ne doit pas être vide."
        });
        return;
    }
    const category = {
        ...req.body
    };
    //display test
    console.dir(category);
    db.query("insert into categories set ?",category, (error,result) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de la création de la catégories"
            });
            console.log("Error : " + error);
            return;
        }
        if(!res){
            result.status(200).send({
                message: "La catégorie existe déjà."
            });
            return;
        }
        else{
            result.status(201).send({
                message:"La catégories a bien été créer."
            });
            return;
        }
    });
};

//method to return all categories in the database
exports.findAll = (req,result) =>{
    db.query("select * from categories", (error,res) =>{
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
            message:"Il n'y a pas de catégories dans la base de données."
        });
        return;
    });
};

//method to return a category bases on its ID
exports.findById = (req,result) =>{
    db.query(`select * from categories where categories.id = ${req.params.categoryId}`,(error,res) =>{
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
        res.status(404).send({
            message:"La catégories avec l'ID " + req.params.categoryId + " n'existe pas."
        });
    });
};

//method to return a category by its name
exports.findByCategoryName = (req,result) =>{
    db.query(`select * from categories where categories.categoryName = ${req.params.categoryName}`,(error,res) =>{
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
            message:"La catégorie avec le nom " + req.params.categoryName + " n'existe pas."
        });
    });
};

//method to change the category's information
exports.updateCategoryById = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        return;
    }
    const category = {
        ...req.body
    };
    db.query(`update categories set categoryName = ${category.categoryName} where categories.id = ${req.params.categoryId}`,(error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message: "La catégorie avec l'ID " + req.params.categoryId + " n'existe pas."
            });
            return;
        }
        else{
            result.status(200).send({
                message:"La catégorie a été modifier."
            });
        }
    });
};

//method to delete a category
exports.deleteById = (req,result) =>{
    db.query(`delete from categories where categories.id = ${req.params.categoryId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message: "La catégorie avec l'ID " + req.params.categoryId + " n'existe pas."
            });
            return;
        }
        result.status(200).send({
            message:"La catégorie a bien été supprimer."
        });
    });
};
