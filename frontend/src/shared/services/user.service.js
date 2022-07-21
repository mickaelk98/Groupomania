const BASE_URL = 'http://localhost:5000/api/auth/';

//* fonction pour créer un utilisateur
export async function createUser(data) {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-Type': 'application/json'
            }
        });

        const user = await response.json();

        //* si le compte a été crée
        if (response.ok) {
            //* retourne l'utilisateur
            return user;
        }
        //* sinon retourn les erreurs
        else {
            throw user;
        }
    } catch (e) {
        throw e;
    }
}


//* fonction pour recuperer le profil d'un utilisateur
export async function getUserProfil(userId) {

    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
            }
        });

        const user = await response.json();
        console.log(user);
        return user;
    } catch (e) {
        console.log(e);
    }
}
