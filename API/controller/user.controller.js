const db = require("../model/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user controller

//method to create a user in the database
exports.createUser = (req,result) => {
    try{
        if(Object.keys(req.body).length === 0){
            result.status(400).send({
                message: "Le contenu ne doit pas être vide."
            });
            return;
        }
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(15);
        const hashPassword = bcrypt.hashSync(password,salt);
        const user = {
            ...req.body,
            password: hashPassword,
        };
        db.query("insert into users set ?", user, (error,res) =>{
            if(!res){
                result.status(200).send({
                    message: "Un utilisateur existe déjà avec cette adresse email."
                });
                return;
            }
            else{
                result.status(201).send({
                    message: "L'utilisateur a été créer."
                });
                return;
            }
        });
    }
    catch(error){
        result.status(500).send({
            message: "Une erreur est survenue lors de la création de l'utilisateur."
        });
        console.log("Error : " + error);
    }
};

//method to return all users in the database
exports.findAll = (req,result) =>{
    db.query("select * from users", (error,res) =>{
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
            message: "Il n'y a pas d'utilisateurs dans la base de données."
        });
        return;
    });
};

//method to return a user based on its ID
exports.findById = (req,result) =>{
    db.query(`select * from users where users.id = ${req.params.id}`, (erorr,res) =>{
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
            message: "L'utilisateur avec l'ID : " + req.params.id + " n'existe pas."
        });
        return;
    });
};

//method to return all users based on its role
exports.findByRoleName = (req,result) =>{
    db.query(`select * from users join roles on roles.id = users.role where roles.roleName = ${req.params.roleName}`, (error,res) =>{
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
            message: "Il n'y a pas d'utilisateurs avec ce role : " + req.params.roleName + "."
        });
    });
};

//method to return a user based on its email
exports.findByEmail = (req,result) =>{
    db.query(`select * from users where users.email = ${req.params.email}`, (error,res) =>{
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
            message: "Il n'y a pas d'utilisateur avec cette adresse email : " + req.params.email + "."
        });
        return;
    });
};

//method to return a user bases on the name and the firstname
exports.findByName = (req,result) =>{
    db.query(`select * from users where users.name = ${req.params.name} and users.firstname = ${rep.params.firstname}`, (error,res) =>{
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
            message:"Il n' y a pas d'utilisateurs avec ce nom (" + req.params.name + ") et ce prénom (" + req.params.firstname + ")."
        });
        return;
    });
};

//method to change the user's information
exports.updateUserById = (req,result) =>{
    if(Object.keys(req.body).length === 0){
        result.status(404).send({
            message: "Le contenu ne doit pas être vide."
        });
        return;
    }
    const user = {
        ...req.body
    };

    if(user.password){
        const salt = bcrypt.genSaltSync(15);
        const hashPassword = bcrypt.hashSync(user.password,salt);
        user.password = hashPassword;
    }

    db.query(`update users set firstname = ${user.firstname}, name = ${user.name}, email = ${user.email},
    phone = ${user.phone}, enable = ${user.enable}, password = ${user.password}, role = ${user.role}
    where users.id = ${req.params.userId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message: "L'utilisateur avec l'ID : " + req.params.userId + " n'existe pas."
            });
            return;
        }
        if(res){
            result.status(200).send({
                message: "L'utilisateur a été modifier."
            });
            return;
        }
    });
};

//method to delete a user
exports.deleteById = (req,result) =>{
    db.query(`delete from users where users.id = ${req.params.userId}`, (error,res) =>{
        if(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'envoie de la requête."
            });
            console.log("Error : " + error);
            return;
        }
        if(res.affectedRows === 0){
            result.status(404).send({
                message: "L'utilisateur avec l'ID : " + req.params.userId + " n'existe pas."
            });
            return;
        }
        
        result.status(200).send({
            message: "L'utilisateur a été supprimer"
        });
    });
};

//method to login an user
exports.login = (req,result) =>{
    const emailUser = req.body.email;
    const clearPassword = req.body.password;
    db.query(`select * from users where users.email = ${emailUser}`, async (error,res) =>{
        if(error){
            result.status(404).send({
                message: "L'utilisateur avec l'email : " + emailUser + " n'existe pas."
            });
            return;
        }
        try{
            const {password : hashPassword,id} = res[0];
            console.dir("User ID : " + id);
            const passwordIsOk = await bcrypt.compare(clearPassword,hashPassword);
            if(passwordIsOk){
                const token = jwt.sign({id}, process.env.SECRET_KEY,{
                    expiresIn: 80000
                });
                const user = {
                    id: res[0].id,
                    firstname: res[0].firstname,
                    name: res[0].name,
                    email: res[0].email,
                    phone: res[0].phone,
                    enable: res[0].enable,
                    password: res[0].password,
                    role: res[0].role
                };
                // création des cookies
                result.cookie("jwt",token);
                result.cookie("user",user);
                result.status(200).send({
                    user: res[0],
                    token: jwt.sign({id}, process.env.SECRET_KEY,{
                        expiresIn:"24h"
                    }),
                });
            }
            else{
                result.status(400).send({
                    message:"L'adresse email et le mot de passe ne correspondent pas."
                });
                return;
            }
        }
        catch(error){
            result.status(500).send({
                message: "Une erreur est survenue lors de l'authentification de l'utilisateur."
            });
            console.log("Error : " + error);
        }
    });
};

//method to logout
exports.logout = (req,result) =>{
    result.clearCookie("user");
    result.clearCookie("jwt");
    result.status(200).send({
        message:"L'utilsateur est déconnecté."
    });
};
