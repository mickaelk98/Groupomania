const passwordValidator = require('password-validator');
const firstNameSchema = new passwordValidator();
const lastNameSchema = new passwordValidator();
const passwordSchema = new passwordValidator();


module.exports = (req, res, next) => {

    const { firstName, lastName, password } = req.body

    if (!firstName && !lastName && !password) {
        return res.status(400).json({ errors: { message: "Vous devez rentrez les informtion demandée pour crée un compte" } })
    }

    //*schema du prenom
    firstNameSchema
        .has("^([a-z]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$", "Votre prénom n'est pas conforme")

    //* schema du nom
    lastNameSchema
        .has("^([a-z]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$", "Votre nom n'est pas conforme")

    //* schema du mot de passe
    passwordSchema
        .is().min(8, "Votre mot de passe doit faire un minimun de 8 caractères")
        .has().uppercase(1, "Votre mot de passe doit contenir au moin une majuscule")
        .has().lowercase(1, "Votre mot de passe doit contenir au moin une minuscule")
        .has().digits(1, "Votre mot de passe doit contenir au moin un nombre")
        .has().symbols(1, "votre mot de passe doit contenir au moin un caractere speciale")
    // .has().oneOf(['@'])


    //* verifie les saisie de l'utilisateur
    const validFirstName = firstNameSchema.validate(firstName, { details: true });
    const validLastName = lastNameSchema.validate(lastName, { details: true })
    const validPassword = passwordSchema.validate(password, { details: true });
    const errors = { firstName: '', lastName: '', password: '' };


    //* si le prenom n'est pas valid
    if (validFirstName.length > 0) {
        for (let i = 0; i < validFirstName.length; i++) {

            return res.status(400).json({ errors: { firstName: validFirstName[i].message } });
        }
        //* sinon si c'est le nom
    } else if (validLastName.length > 0) {
        for (let i = 0; i < validLastName.length; i++) {

            return res.status(400).json({ errors: { lastName: validLastName[i].message } });
        }

        //* sinon si c'est le mot de passe 
    } else if (validPassword.length > 0) {
        for (let i = 0; i < validPassword.length; i++) {

            return res.status(400).json({ errors: { password: validPassword[i].message } });
        }
        //* si ils sont tous valid
    } else {
        next();
    }

}
