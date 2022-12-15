const db = require("../db.js");

exports.createRole = (req, result) => {
    const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    if (Object.keys(req.body).length === 0) {
        result.status(404).send({
            message: "Le contenu ne doit pas être vide."
        });
        console.log(display + " : Le contenu est vide la requête ne peut pas être envoyer.")
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
            console.log(display + " : Une erreur est survene lors de l'envoie de la requête. (api/roles/addRole)")
            console.error(error);
            return;
        }
        if (!res) {
            result.status(200).send({
                message: "Le role existe déjà."
            });
            console.log(display + " : Le role avec le nom " + role.roleName + " existe déjà.");
            return;
        }
        result.status(200).send({
            message: "Le role a bien été créer."
        });
        console.log(display + " : Le role avec le nom " + role.roleName + " a bien été ajouter dans la base de données");
        return;
    });
};

exports.findAll = (req, result) => {
    const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    db.query("SELECT * FROM roles", (error, res) => {
        if (error) {
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(display + " : Une erreur est survenue lors de l'envoie de la requête. (api/roles/)");
            console.error(error);
            return;
        }
        if (res.length) {
            result.status(200).send(res);
            console.log(display + " : Les données ont bien été envoyer (roles).");
            return;
        }
        result.status(404).send({
            message: "Il n'y a pas de roles dans la base de données."
        });
        console.log(display + " : Il n'y a pas de roles dans la base de données.");
        return;
    });
};

exports.findByRoleName = (req, result) => {
    const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    db.query(`SELECT * FROM roles where roleName = ${req.params.name}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(display + " : Une erreur est survenue lors de l'envoie de la requête (api/roles/:name)");
            console.error(error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            console.log(display + " : Les données du role avec le nom " + req.params.name + " ont été envoyer.");
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas de role avec le nom : " + req.params.name + " ."
        });
        console.log(display + "Il n'y a pas de role avec le nom : " + req.params.name + " .");
        return;
    });
};

exports.updateById = (req,result) =>{
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

    const role = {
        ...req.body
    };

    db.query(`UPDATE roles SET roleName = '${role.roleName}' WHERE id = ${req.params.id}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(display + " : Une erreur est survenue lors de l'envoie de la requête. (api/roles/update/:id");
            console.error(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de roles avec l'ID : " + req.params.id + "."
            });
            console.log(display + " : Il n'y a pas de roles avec l'ID : " + req.params);
            return;
        }
        result.status(200).send({
            message:"Le role avec l'ID : " + req.params.id + " a bien été modifier."
        });
        console.log(display + " : Le role avec l'ID : " + req.params.id + " a bien été modifier.");
        return;
    });
};

exports.deleteById = (req,result) => {
    const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    db.query(`DELETE FROM roles WHERE id = ${req.params.id}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(display + " : Une erreur est survenue lors de l'envoie de la requête. (/api/roles/delete/:id");
            console.error(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas de roles avec l'ID : " + req.params.id + "."
            });
            console.log(display + " : Il n'y a pas de roles avec l'ID : " + req.params.id + ".");
            return;
        }
        result.status(200).send({
            message:"Le role avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log(display + " : Le role avec l'ID : " + req.params.id + " a bien été supprimer.");
        return;
    });
};