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
    //TODO
}

//method to return a category bases on its ID
exports.findById = (req,result) =>{
    //TODO
}

//method to return a category by its name
exports.findByCategoryName = (req,result) =>{
    //TODO
}

//method to change the category's information
exports.updateCategoryById = (req,result) =>{
    //TODO
}

//method to delete a category
exports.deleteById = (req,result) =>{
    //TODO
}
