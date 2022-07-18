const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //* recuperation du token
        const token = req.headers.authorization.split(' ')[1];

        //* verification de l'authenticité du token
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

        //* extraction de l'id et du status de celui qui fait la requete
        const { userId, userStatus } = decodedToken;

        //* ajout du status et de l'id dans un objet pour l'utiliser dans les middleware suivant
        req.auth = { userId, userStatus };

        //* si l'id de la requete est diferent de celui du token
        if (req.body.posterId && req.body.posterId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({ message: 'Requete non authentifié', err });
    }
}