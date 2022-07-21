const BASE_URL = 'http://localhost:5000/api/auth/';

//* fonction pour authentifier un utilisateur
export async function login(data) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-Type': 'application/json'
        }
    });

    const user = await response.json();

    //* si la connexion a été reussi
    if (response.ok) {
        return user;
    }
    else {
        throw user
    }
}
