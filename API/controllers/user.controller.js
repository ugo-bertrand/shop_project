const db = require("../db.js");
const dateFile = require("../date.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/users/addUser).");
        return;
    }
    const password = req.body.password ;
    try{
        const salt = bcrypt.genSaltSync(15);
        const hashPassword = bcrypt.hashSync(password,salt);
        const user = {
            ...req.body,
            password: hashPassword
        };
        db.query("INSERT INTO users set ?", user, (error,res) => {
            if(!res){
                result.status(200).send({
                    message:"Un utilisateur utilise déjà cette adresse mail."
                });
                console.log(date + " : Un utilisateur utilise déjà cette adresse mail : " + user.email + " (api/users/addUser).");
                return;
            }
            result.status(201).send({
                message:"L'utilisateur a bien été créer."
            });
            console.log(date + " : L'utilisateur avec l'adresse mail : " + user.email + " a bien été créer (api/users/addUser).");
            return;
        })
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie de la requête."
        });
        console.log(date + " : Une erreur est survenur lors de l'envoie de la requête (api/users/addUser).");
        console.log(error);
        return;
    }
}

exports.findAll = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query("SELECT * FROM users", (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/users/).");
            console.log(error);
            return;
        }
        if(res.length){
            result.status(200).send(res);
            console.log(date + "Les données ont bien été envoyer (api/users/).");
            return;
        }
        result.status(404).send({
            message:"Il n'y a pas d'utilisateurs dans la base de données."
        });
        console.log(date + " : Il n'y a pas d'utilisateurs dans la base de données (api/users/).");
        return;
    })
}

exports.updateById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message:"Le contenu ne doit pas être vide."
        });
        console.log(date + " : Le contenu est vide la requête ne peut pas être envoyer (api/users/update/:id).");
        return;
    }
    const user = {
        ...req.body
    };
    var salt = bcrypt.genSaltSync(15);
    var hashPassword = bcrypt.hashSync(user.password,salt);
    user.password = hashPassword;

    db.query(`UPDATE users SET firstname = '${user.firstname}', name = '${user.name}', email = '${user.email}', phone = '${user.phone}',
     enable = ${user.enable}, password = '${user.password}', role = ${user.role} WHERE id = ${req.params.id}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/users/update/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'utilisateurs avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas d'utilisateurs avec l'ID : " + req.params.id + " (api/users/update/:id).");
            return;
        }
        result.status(200).send({
            message:"L'utilisateur avec l'ID : " + req.params.id + " a bien été modifier."
        });
        console.log(date + "L'utilisateur avec l'ID : " + req.params.id + " a bien été modifier (api/users/update/:id).");
        return;
     });
};

exports.deleteById = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/users/delete/:id).");
            console.log(error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message:"Il n'y a pas d'utilisateurs avec l'ID : " + req.params.id + " ."
            });
            console.log(date + " : Il n'y a pas d'utilisateurs avec l'ID : " + req.params.id + " (api/users/delete/:id).");
            return;
        }
        result.status(200).send({
            message:"L'utilisateur avec l'ID : " + req.params.id + " a bien été supprimer ."
        });
        console.log(date + " : L'utilisateur avec l'ID : " + req.params.id + " a bien été supprimer (api/users/delete/:id).");
        return;
    });
};

exports.login = (req,result) => {
    var date = dateFile.GetDate(new Date());
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (error,res) => {
        if(error){
            result.status(500).send({
                message:"Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log(date + " : Une erreur est survenue lors de l'envoie de la requête (api/users/login).");
            console.log(error);
            return;
        }
        if(res.length){
            try{
                const { password: hashPassword, id} = res[0];
                console.log("User id : " + id);
                const passwordOk =  bcrypt.compareSync(req.body.clearPassword,hashPassword);
                if(passwordOk){
                    const user = {
                        id: res[0].id,
                        email: res[0].email
                    };
                    const token = jwt.sign({ user },process.env.SECRET_KEY, {
                        expiresIn: 80000
                    });
                    result.cookie("jwt");
                    result.status(200).send({
                        token: jwt.sign({user}, process.env.SECRET_KEY,{
                            expiresIn:"24h"
                        }),
                    });
                }
                else{
                    result.status(400).send({
                        message: "L'adresse mail et le mot de passe fournis ne correspondent pas."
                    });
                    console.log(date + " : L'adresse mail ( " + req.body.email +  ") et le mot de passe fournis ne correspondent pas. (api/users/login).");
                    return;
                }
            }
            catch(error){
                result.status(500).send({
                    message:"Une erreur est survenue lors de l'authentification de l'utilisateurs."
                });
                console.log(date + " : Une erreur est survenue lors de l'authentification de l'utilisateur (api/users/login).");
                console.log(error);
            }
        }
    })
}

exports.logout = (req,result) => {
    var date = dateFile.GetDate(new Date());
    result.clearCookie("jwt");
    result.status(200).send({
        message:"L'utilisateur a été déconnecter."
    });
    console.log(date + " : Déconnexion d'un utilisateur (api/users/logout).");
}
