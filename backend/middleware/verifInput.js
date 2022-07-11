const passwordValidator = require('password-validator');
const firstNameSchema = new passwordValidator();
const lastNameSchema = new passwordValidator();
const passwordSchema = new passwordValidator();
const descriptionSchema = new passwordValidator();

module.exports = (req, res, next) => {

    const { firstName, lastName, password, description } = req.body

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

    //* schema de la description
    descriptionSchema
        .is().max(1000, "Votre description ne doit pas depasser 1000 caractères")



    //* verifie les saisie de l'utilisateur
    const validFirstName = firstNameSchema.validate(firstName, { details: true });
    const validLastName = lastNameSchema.validate(lastName, { details: true })
    const validPassword = passwordSchema.validate(password, { details: true });
    const validDescription = descriptionSchema.validate(description, { details: true });

    const validArray = [validFirstName, validLastName, validPassword, validDescription]
    // console.log(validArray);
    // console.log(validArray.length);
    let valid = 0;

    //* si le mot de passe n'est pas valide || verification des inputs
    for (let i = 0; i < validArray.length; i++) {

        //* si il y a une erreur
        if (validArray[i].length > 0) {
            // console.log("mot de passe invalid");
            for (let j = 0; j < validArray[j].length; j++) {
                return res.status(400).json({ message: validArray[i][j].message })
            }
        } else {
            valid++;
            console.log("ok");
            // console.log(validPass);
            // console.log("mot de passe valid");
            // next();
        }
    }
    if (valid > 3) {
        next();
    } else {
        return res.status(400).json({ message: "l'un des champ n'est pas valid" })
    }
    // console.log("ok");
}
