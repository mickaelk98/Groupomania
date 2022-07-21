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
    const auth = user.token

    console.log(user);
    //* si la connexion a été reussi
    if (response.ok) {
        localStorage.setItem("auth", JSON.stringify(auth))
        return user.user;
    }
    else {
        throw user
    }
}
