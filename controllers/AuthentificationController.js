const prisma = require("../config/prisma");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

class AuthentificationController {
    async login(req, res) {
        try {
            // try = si ca marche pas Catch (e)
            const body = req.body; // recup les infos du body

            const user = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (user === null) {
                return res.status(404).send("User not found");
            }

            const isSamePassword = await comparePassword(
                // compare si le mots de passe est le même
                body.password,
                user.password
            );

            if (!isSamePassword) {
                // si c'est pas le meme mots de passe on est refuser = error 401
                return res.status(401).send("Unauthorized");
            }

            // ICI ON GENERE UN TOKEN

            const token = generateToken(user); //reste connecter

            return res.status(200).send({ user, token });
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }
}

module.exports = new AuthentificationController();
