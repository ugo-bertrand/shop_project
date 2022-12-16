const db = require("../db.js");
const dateFile = require("../date.js");

exports.createRole = (req, result) => {
    var date = dateFile.GetDate(new Date)
    if (Object.keys(req.body).length === 0) {
        result.status(404).send({
            message: "Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/roles/addRole).")
        return;
    }
    const role = {
        ...req.body
    };

    db.query("INSERT INTO roles SET ?", role, (error, res) => {
        if (error) {
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survene lors de l'envoie de la requête (api/roles/addRole).")
            console.error(error);
            return;
        }
        if (!res) {
            result.status(200).send({
                message: "Le role existe déjà."
            });
            console.log(date + " : Le role avec le nom " + role.roleName + " existe déjà (api/roles/addRole).");
            return;
        }
        result.status(200).send({
            message: "Le role a bien été créer."
        });
        console.log(date + " : Le role avec le nom " + role.roleName + " a bien été ajouter dans la base de données (api/roles/addRole).");
        return;
    });
};

exports.findAll = (req, result) => {
    var date = dateFile.GetDate(new Date());
    db.query("SELECT * FROM roles", (error, res) => {
        if (error) {
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/roles/).");
            console.error(error);
            return;
        }
        if (res.length) {
            result.status(200).send(res);
            console.log(date + " : Les données ont bien été envoyer (api/roles/).");
            return;
        }
        result.status(404).send({
            message: "Il n'y a pas de roles dans la base de données."
        });
        console.log(date + " : Il n'y a pas de roles dans la base de données (api/roles/).");
        return;
    });
};

exports.findByRoleName = (req, result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`SELECT * FROM roles where roleName = ${req.params.name}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/roles/name/:name).");
            console.error(error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            console.log(date + " : Les données du role avec le nom " + req.params.name + " ont été envoyer (api/roles/name/:name).");
            return
        }
        result.status(404).send({
            message:"Il n'y a pas de role avec le nom : " + req.params.name + " ."
        });
        console.log(date + "Il n'y a pas de role avec le nom : " + req.params.name + " (api/roles/name/:name).");
        return;
    });
};

exports.updateById = (req,result) =>{
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/roles/update/:id).");
        return;
    }

    const role = {
        ...req.body
    };

    db.query(`UPDATE roles SET roleName = '${role.roleName}' WHERE id = ${req.params.id}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête. (api/roles/update/:id");
            console.error(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de roles avec l'ID : " + req.params.id + "."
            });
            console.log(date + " : Il n'y a pas de roles avec l'ID : " + req.params + " (api/roles/update/:id).");
            return;
        }
        result.status(200).send({
            message:"Le role avec l'ID : " + req.params.id + " a bien été modifier."
        });
        console.log(date + " : Le role avec l'ID : " + req.params.id + " a bien été modifier (api/roles/update/:id).");
        return;
    });
};

exports.deleteById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`DELETE FROM roles WHERE id = ${req.params.id}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (/api/roles/delete/:id).");
            console.error(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de roles avec l'ID : " + req.params.id + "."
            });
            console.log(date + " : Il n'y a pas de roles avec l'ID : " + req.params.id + " (api/roles/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"Le role avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log(date + " : Le role avec l'ID : " + req.params.id + " a bien été supprimer (api/roles/delete/:id).");
        return;
    });
};