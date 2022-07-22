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
        if (response.ok) {

            return user;
        } else {
            return null
        }
    } catch (e) {
        console.log(e);
    }
}

//* fonction pour mettre a jour un utilisateur
export async function updateUser(userId, userToken, data) {
    try {

        const fd = new FormData()

        fd.append('firstName', data.firstName)
        fd.append('lastName', data.lastName)
        fd.append('email', data.email)
        fd.append('password', data.password)
        fd.append('description', data.description)
        fd.append('image', data.image)
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'PUT',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + userToken,
            }
        });
        const user = await response.json()
        console.log(user);
        if (response.ok) {

            return user;
        }
        else {
            throw user
        }
    } catch (e) {
        throw e;
    }
}

//* fonction pour mettre a jour un utilisateur
export async function deleteUser(userId, userToken) {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + userToken,
            }
        });

        const user = await response.json();
        if (response.ok) {
            console.log(user);
            localStorage.clear();
            return null;
        }
        console.log(user);
        return user
    } catch (e) {
        console.log(e);
    }
}