const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //* recuperation du token
        const token = req.headers.authorization.split(' ')[1];

        //* verification de l'authenticité du token
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        console.log(decodedToken);
        //* extraction de l'id et du status de celui qui fait la requete
        const { userId, userStatus, userFirstName, userLastName, userImage } = decodedToken;

        //* ajout du status et de l'id dans un objet pour l'utiliser dans les middleware suivant
        req.auth = { userId, userStatus, userFirstName, userLastName, userImage };

        next();
    } catch (err) {
        res.status(401).json({ message: 'Requete non authentifié', err });
    }
}