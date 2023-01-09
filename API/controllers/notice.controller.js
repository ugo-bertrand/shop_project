const db = require("../db.js");
const dateFile = require("../date.js");

exports.createNotice = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu est vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer.");
        return;
    }
    const notice = {
        ...req.body
    };

    db.query("INSERT INTO notices SET ?",notice,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/notices/addNotice).");
            console.log(error);
            return;
        }
        result.status(200).send({
            message:"L'avis a bien été pris en compte."
        });
        console.log(date + " : L'avis a bien été ajouter.");
        return;
    });
};

exports.findAll = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query("SELECT * FROM notices",(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/notices/).");
            console.log(error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            console.log(date + " : Les données ont bien été envoyé (api/notices/).");
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas d'avis dans la base de données."
        });
        console.log(date + " : Il n'y a pas d'avis dans la base de données (api/notices/).");
        return;
    })
}

exports.updateById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu est vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoye (api/notices/update/:id).");
        return;
    }
    const notice = {
        ...req.body
    }
    db.query(`UPDATE notices SET message = '${notice.message}', productId = ${notice.productId}, userId = ${notice.userId}`,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/notices/update/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'avis avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas d'avis avec l'ID : " + req.params.id + " (api/notices/update/:id).");
            return;
        }
        result.status(200).send({
            message:"L'avis avec l'ID : " + req.params.id + " a bien été modifier."
        });
        console.log(date + " : L'avis avec l'ID : " + req.params.id + " a bien été modifier.");
        return;
    })
}

exports.deleteById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`DELETE FROM notices WHERE id = ${req.params.id}`,(error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/notices/delete/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'avis avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas d'avis avec l'ID : " + req.params.id + " (api/notices/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"l'avis avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log(date + " : L'avis avec l'ID : " + req.params.id + " a bien été supprimer.");
        return;
    });
};