const db = require("../model/db.js");

//role controller

//method to create a role in the database
exports.createRole = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        return;
    }
    const role = {
        ...req.body
    };
    // display test
    console.dir(role);
    db.query("insert into roles set ?",role, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de la création du role."
            });
            console.log("Error : "+ error);
        }
        if(!res){
            result.status(200).send({
                message: "Le role existe déjà."
            });
            return;
        }
        else{
            result.status(201).send({
                message: "Le rote a bien été créer."
            });
            return;
        }
    });
};

//method to return all roles in the database
exports.findAll = (req,result) =>{
    db.query("select * from roles", (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.length === 0){
            result.status(404).send({
                message: "Il n'y pas de roles dans la base de données."
            });
            return;
        }
        result.status(200).send(res);
        return;
    });
};

//method to return a role bases on its ID
exports.findById = (req,result) =>{
    db.query(`select * from roles where roles.id = ${req.params.roleId}`, (error,res) =>{
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
            message: "Le role avec l'ID " + req.params.roleId + " n'existe pas."
        });
        return;
    });
}

//method to return a role bases on its name
exports.findByRoleName = (req,result) =>{
    db.query(`select * from roles where roles.roleName = ${req.params.roleName}`, (error,res) =>{
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
            message: "Il n' y pas de role avec le nom : " + req.params.roleName
        });
    });
};

//method to change the role's information
exports.updateRoleById = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message: "Le contenu ne doit pas être vide"
        });
        return;
    }
    const role = {
        ...req.body
    };
    db.query(`update roles set roleName = ${role.roleName} where id = ${req.params.roleId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de la modification du role."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message: "Le role avec l'ID " + req.params.roleId + " n'existe pas."
            });
            return;
        }
        if(res){
            result.status(200).send({
                message:"Le role a bien été modifier."
            });
            return;
        }
    });
};

//method to delete a role
exports.deleteById = (req,result) =>{
    db.query(`delete roles where roles.id = ${req.params.roleId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de la suppression du role."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Le role avec l'ID " + req.params.roleId + " n'existe pas."
            });
            return;
        }
        result.status(200).send({
            message:"Le role a bien été supprimer."
        });
    });
};