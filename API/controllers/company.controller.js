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
                message:"L'entreprise avec le nom"
            })
        }
    })
}

exports.findAll = (req,result) => {

}

exports.updateById = (req,result) => {

}

exports.deleteById = (req,result) => {

}