const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
    async getMyProfile(req, res) {
        const user = req.user;
        return res.status(200).send(user);
    }

    // (1) /users en GET = tous l
    async index(req, res) {
        const users = await prisma.user.findMany();
        return res.status(200).send(users); // 200=OK
    }

    // (2) /users en POST = créer les utilisateurs
    async store(req, res) {
        // request et response
        try {
            const body = req.body; // recupere le body
            const user = await prisma.user.create({
                data: {
                    pseudo: body.pseudo,
                    age: body.age,
                    email: body.email,
                    name: body.name,
                    house: "",
                    password: await hashPassword(body.password),
                    confirmPassword: body.confirmPassword,
                },
            }); // insere une ligne dans un tableau push=pousser users=tableau pousse dans le tableau
            return res.status(201).send(user); // retourne une reponse (par défaut=201) et envoie dans le tableau
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    // (3) /users/:id en GET = un utilisateur
    async show(req, res) {
        try {
            const id = req.params.id;
            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(id),
                },
            }); // users S = nom du tableau - user sans S = element

            if (user === null) {
                return res.status(404).send("User not found");
            }

            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            }); // 200=OK user et pas users car je veut 1 seul utilisateur
        }
    }

    // (4) /users/:id en PUT = modifier un utilisateur
    async update(req, res) {
        try {
            const id = req.params.id; // const = constante on la change pas
            const body = req.body;
            const user = await prisma.user.update({
                where: {
                    user_id: parseInt(id),
                },
                data: body,
            });

            if (user === null) {
                return res.status(404).send("User not found");
            }

            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    // (5)/users/:id en DELETE = supprimer un utilisateur
    async destroy(req, res) {
        try {
            const id = req.params.id;
            //let user = users.find((user) => user.id === parseInt(id));
            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(id),
                },
            }); // users S = nom du tableau - user sans S = element

            if (user === null) {
                return res.status(404).send("User not found");
            }
            await prisma.user.delete({
                where: {
                    id: parseInt(id),
                },
            });
            return res.status(204).send();
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }
}

// /users en GET ='tous les utilisateurs (1)
// /users en POST = créer un utilisateur (2)
// /users/:id en GET = un utilisateur (3)
// /users/:id en PUT = modifier un utilisateur (4)
// /users/:id en DELETE = suprimer un utilisateur (5)

module.exports = new UsersController();
